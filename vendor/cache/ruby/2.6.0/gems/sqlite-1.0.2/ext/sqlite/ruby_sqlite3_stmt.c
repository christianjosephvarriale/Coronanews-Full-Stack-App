#include <ruby.h>

#include "ruby_sqlite3.h"
#include "ruby_sqlite3_stmt.h"

#define CLASS_NAME "Statement"

static VALUE m_init(VALUE self);
static VALUE m_step(VALUE self);
static VALUE m_keys(VALUE self);
static VALUE m_each(VALUE self);
static VALUE m_columns(VALUE self);
static VALUE m_column_type(VALUE self, VALUE ordinal);
static VALUE m_column(VALUE self, VALUE ordinal);
static VALUE m_column_text(VALUE self, VALUE ordinal);
static VALUE m_column_int(VALUE self, VALUE ordinal);
static VALUE m_column_double(VALUE self, VALUE ordinal);

static struct statement* get_object(VALUE self);

static void deallocator(void* x)
{
    statement* stmt = (statement*)x;

    if (stmt != NULL)
    {
        if (stmt->handle != NULL)
        {
            sqlite3_finalize(stmt->handle);

            stmt->handle = NULL;
        }

        free(stmt);
    }
}

static VALUE allocator(VALUE cls)
{
    statement* s = NULL;

    return Data_Wrap_Struct(cls, NULL, deallocator, s);
}

static VALUE cls;

void init_sqlite3_stmt(VALUE module)
{
    cls = rb_define_class_under(module, CLASS_NAME, rb_cObject);
    rb_define_alloc_func(cls, allocator);

    rb_define_method(cls, "initialize",   m_init, 0);
    rb_define_method(cls, "step",         m_step, 0);
    rb_define_method(cls, "each",         m_each, 0);
    rb_define_method(cls, "keys",         m_keys, 0);
    rb_define_method(cls, "columns",      m_columns, 0);
    rb_define_method(cls, "columnType",   m_columns, 1);
    rb_define_method(cls, "column",       m_column, 1);
    rb_define_method(cls, "[]",           m_column, 1);
    rb_define_method(cls, "columnText",   m_column_text, 1);
    rb_define_method(cls, "columnInt",    m_column_int, 1);
    rb_define_method(cls, "columnDouble", m_column_double, 1);
}

VALUE m_init(VALUE self)
{
    rb_raise( rb_eRuntimeError,
              "Cannot create a Apache::Server object this way" );
}

VALUE make_sqlite3_stmt(VALUE connection, sqlite3* db, VALUE sql)
{
    Check_Type(connection, T_DATA);
    Check_Type(sql, T_STRING);

    // Require that db be a C ext type
    Check_Type(connection, T_DATA);

    // Require that db be of SQLite class
    if (rb_obj_is_instance_of(connection, sqlite3_class()) == Qfalse)
    {
        rb_raise( rb_eRuntimeError,
                  "wrong argument type %s (expected %s)",
                  rb_obj_classname(connection),
                  rb_class2name(cls)
                );
    }

    const char* zSQL = StringValuePtr(sql);

    // Allocate statement struct
    statement* stmt = (statement*)malloc(sizeof(statement));

    int rc = sqlite3_prepare(db, zSQL, strlen(zSQL), &stmt->handle, NULL);

    if (rc != SQLITE_OK)
    {
        // Free allocated memory
        free(stmt);

        rb_raise( rb_eRuntimeError, "sqlite::prepare() - %s",
                  sqlite3_errmsg(db) );
    }

    // Create Ruby stmt object
    VALUE obj = Data_Wrap_Struct(cls, NULL, deallocator, stmt);

    // Assign the sqlite3 instance to keep a reference count on it.
    rb_ivar_set(obj, rb_intern("connection"), connection);

    return obj;
}

VALUE sqlite3_stmt_class()
{
    return cls;
}

statement* get_object(VALUE self)
{
    statement* stmt;
    Data_Get_Struct(self, statement, stmt);

    return stmt;
}

#define ENSURE_STATEMENT_HANDLE(x)                               \
    if(x == NULL)                                                \
    {                                                            \
        rb_raise( rb_eRuntimeError, "Invalid statement handle"); \
    }

VALUE m_step(VALUE self)
{
    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    return INT2FIX(sqlite3_step(stmt->handle));
}

VALUE m_columns(VALUE self)
{
    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    return INT2FIX(sqlite3_column_count(stmt->handle));
}

VALUE m_column_type(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    return INT2FIX(sqlite3_column_type(stmt->handle, NUM2INT(ordinal)));
}

VALUE column_value(statement* stmt, int i)
{
    int type = sqlite3_column_type(stmt->handle, i);

    switch (type)
    {
        case SQLITE_INTEGER:
        {
            return INT2FIX(sqlite3_column_int(stmt->handle, i));
        }

        case SQLITE_FLOAT:
        {
            return rb_float_new(sqlite3_column_double(stmt->handle, i));
        }

        case SQLITE_BLOB:
        {
            return rb_str_new( (const char*)sqlite3_column_blob(stmt->handle, i),
                               sqlite3_column_bytes(stmt->handle, i) );
        }

        case SQLITE_NULL:
        {
            return Qnil;
        }

        case SQLITE_TEXT:
        {
            return rb_str_new( (const char*)sqlite3_column_text(stmt->handle, i),
                               sqlite3_column_bytes(stmt->handle, i) );
        }
    }

    return Qnil;
}

VALUE m_column(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int i = NUM2INT(ordinal);

    return column_value(stmt, i);
}

VALUE m_each(VALUE self)
{
    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int cols = sqlite3_column_count(stmt->handle);

    int i;
    for (i = 0; i < cols; i++)
    {
        rb_yield( rb_ary_new3( 2,
                               rb_str_new2(sqlite3_column_name(stmt->handle, i)),
                               column_value(stmt, i) ) );
    }

    return Qnil;
}

VALUE m_keys(VALUE self)
{
    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int cols = sqlite3_column_count(stmt->handle);

    VALUE a = rb_ary_new();

    int i;
    for (i = 0; i < cols; i++)
    {
        rb_ary_push(a, rb_str_new2(sqlite3_column_name(stmt->handle, i)));
    }

    return a;
}

VALUE m_column_text(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int i = NUM2INT(ordinal);

    // Check that ordinal is within bounds
    int cols = sqlite3_column_count(stmt->handle);

    if (i >= cols)
    {
        return Qnil;
    }

    int type = sqlite3_column_type(stmt->handle, i);

    return rb_str_new( (const char*)sqlite3_column_text(stmt->handle, i),
                       sqlite3_column_bytes(stmt->handle, i) );
}

VALUE m_column_blob(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int i = NUM2INT(ordinal);

    // Check that ordinal is within bounds
    int cols = sqlite3_column_count(stmt->handle);

    if (i >= cols)
    {
        return Qnil;
    }

    int type = sqlite3_column_type(stmt->handle, i);

    return rb_str_new( (const char*)sqlite3_column_blob(stmt->handle, i),
                       sqlite3_column_bytes(stmt->handle, i) );
}

VALUE m_column_int(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int i = NUM2INT(ordinal);

    // Check that ordinal is within bounds
    int cols = sqlite3_column_count(stmt->handle);

    if (i >= cols)
    {
        return Qnil;
    }

    int type = sqlite3_column_type(stmt->handle, i);

    return INT2FIX(sqlite3_column_int(stmt->handle, i));
}

VALUE m_column_double(VALUE self, VALUE ordinal)
{
    Check_Type(ordinal, T_FIXNUM);

    statement* stmt = get_object(self);

    ENSURE_STATEMENT_HANDLE(stmt->handle)

    int i = NUM2INT(ordinal);

    // Check that ordinal is within bounds
    int cols = sqlite3_column_count(stmt->handle);

    if (i >= cols)
    {
        return Qnil;
    }

    int type = sqlite3_column_type(stmt->handle, i);

    return rb_float_new(sqlite3_column_double(stmt->handle, i));
}
