#include <stdbool.h>
#include <ruby.h>

#include "sqlite3.h"
#include "ruby_sqlite3.h"
#include "ruby_sqlite3_stmt.h"

#define CLASS_NAME "Database"

static VALUE m_aborted(VALUE self);
static VALUE m_init(VALUE self);
static VALUE m_open(VALUE self, VALUE db);
static VALUE m_close(VALUE self);
static VALUE m_prepare(VALUE self, VALUE sql);
static VALUE m_finalize(VALUE self, VALUE stmt);
static VALUE m_errno(VALUE self);
static VALUE m_error(VALUE self);
static VALUE m_begin(VALUE self);
static VALUE m_commit(VALUE self);
static VALUE m_rollback(VALUE self);
static VALUE m_exec(VALUE self, VALUE sql);
static VALUE m_insert_id(VALUE self);

typedef struct connection
{
    sqlite3* handle;
    int rc;
    bool dont_delete;
} connection;

static connection* get_object(VALUE self);

static void deallocator(void* x)
{
    if (x != NULL)
    {
        connection* c = (connection*)x;

        if (c->handle != NULL)
        {
            if (c->dont_delete == false)
            {
                sqlite3_close(c->handle);
            }

            c->handle = NULL;
        }

        free(x);
    }
}

static VALUE allocator(VALUE cls)
{
    connection* c = (connection*)malloc(sizeof(connection));

    // Set dont_delete to false -- we have to clean this up as we allocated it.
    c->dont_delete == false;

    return Data_Wrap_Struct(cls, NULL, deallocator, c);
}

static VALUE cls;

VALUE make_sqlite3_object(sqlite3* handle)
{
    connection* c = (connection*)malloc(sizeof(connection));

    // Store the handle
    c->handle = handle;

    // Set dont_delete to true -- we don't clean it up as we did not allocate
    // it.
    c->dont_delete == true;

    return Data_Wrap_Struct(cls, NULL, deallocator, c);
}

void init_sqlite3(VALUE module)
{
    cls = rb_define_class_under(module, CLASS_NAME, rb_cObject);
    rb_define_alloc_func(cls, allocator);

    rb_define_method(cls, "initialize",  m_init, 0);
    rb_define_method(cls, "open",        m_open, 1);
    rb_define_method(cls, "close",       m_close, 0);
    rb_define_method(cls, "prepare",     m_prepare, 1);
    rb_define_method(cls, "errno",       m_errno, 0);
    rb_define_method(cls, "error",       m_error, 0);
    rb_define_method(cls, "finalize",    m_finalize, 1);
    rb_define_method(cls, "begin",       m_begin, 0);
    rb_define_method(cls, "commit",      m_commit, 0);
    rb_define_method(cls, "rollback",    m_rollback, 0);
    rb_define_method(cls, "exec",        m_exec, 1);
    rb_define_method(cls, "insertId",    m_insert_id, 0);

    // SQLite constants
    rb_define_global_const("SQLITE_OK",         INT2NUM(SQLITE_OK));
    rb_define_global_const("SQLITE_ERROR",      INT2NUM(SQLITE_ERROR));
    rb_define_global_const("SQLITE_INTERNAL",   INT2NUM(SQLITE_INTERNAL));
    rb_define_global_const("SQLITE_PERM",       INT2NUM(SQLITE_PERM));
    rb_define_global_const("SQLITE_ABORT",      INT2NUM(SQLITE_ABORT));
    rb_define_global_const("SQLITE_BUSY",       INT2NUM(SQLITE_BUSY));
    rb_define_global_const("SQLITE_LOCKED",     INT2NUM(SQLITE_LOCKED));
    rb_define_global_const("SQLITE_NOMEM",      INT2NUM(SQLITE_NOMEM));
    rb_define_global_const("SQLITE_READONLY",   INT2NUM(SQLITE_READONLY));
    rb_define_global_const("SQLITE_INTERRUPT",  INT2NUM(SQLITE_INTERRUPT));
    rb_define_global_const("SQLITE_IOERR",      INT2NUM(SQLITE_IOERR));
    rb_define_global_const("SQLITE_CORRUPT",    INT2NUM(SQLITE_CORRUPT));
    rb_define_global_const("SQLITE_NOTFOUND",   INT2NUM(SQLITE_NOTFOUND));
    rb_define_global_const("SQLITE_FULL",       INT2NUM(SQLITE_FULL));
    rb_define_global_const("SQLITE_CANTOPEN",   INT2NUM(SQLITE_CANTOPEN));
    rb_define_global_const("SQLITE_PROTOCOL",   INT2NUM(SQLITE_PROTOCOL));
    rb_define_global_const("SQLITE_EMPTY",      INT2NUM(SQLITE_EMPTY));
    rb_define_global_const("SQLITE_SCHEMA",     INT2NUM(SQLITE_SCHEMA));
    rb_define_global_const("SQLITE_TOOBIG",     INT2NUM(SQLITE_TOOBIG));
    rb_define_global_const("SQLITE_CONSTRAINT", INT2NUM(SQLITE_CONSTRAINT));
    rb_define_global_const("SQLITE_MISMATCH",   INT2NUM(SQLITE_MISMATCH));
    rb_define_global_const("SQLITE_MISUSE",     INT2NUM(SQLITE_MISUSE));
    rb_define_global_const("SQLITE_NOLFS",      INT2NUM(SQLITE_NOLFS));
    rb_define_global_const("SQLITE_AUTH",       INT2NUM(SQLITE_AUTH));
    rb_define_global_const("SQLITE_ROW",        INT2NUM(SQLITE_ROW));
    rb_define_global_const("SQLITE_DONE",       INT2NUM(SQLITE_DONE));

    // SQLite storage classes
    rb_define_global_const("SQLITE_INTEGER",    INT2NUM(SQLITE_INTEGER));
    rb_define_global_const("SQLITE_FLOAT",      INT2NUM(SQLITE_FLOAT));
    rb_define_global_const("SQLITE_BLOB",       INT2NUM(SQLITE_BLOB));
    rb_define_global_const("SQLITE_NULL",       INT2NUM(SQLITE_NULL));
    rb_define_global_const("SQLITE_TEXT",       INT2NUM(SQLITE_TEXT));
}

VALUE m_init(VALUE self)
{
    return self;
}

VALUE sqlite3_class()
{
    return cls;
}

connection* get_object(VALUE self)
{
    connection* c;
    Data_Get_Struct(self, connection, c);

    return c;
}

#define ENSURE_CONNECTION(x)                              \
    if(x->handle == NULL)                                 \
    {                                                     \
        rb_raise( rb_eRuntimeError, "Invalid db handle"); \
    }

sqlite3* get_sqlite3_handle(VALUE self)
{
    connection* c;
    Data_Get_Struct(self, connection, c);

    return c->handle;
}

VALUE m_errno(VALUE self)
{
    connection* c = get_object(self);

    return INT2FIX(c->rc);
}

VALUE m_error(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    return rb_str_new2(sqlite3_errmsg(c->handle));
}

VALUE m_open(VALUE self, VALUE db)
{
    connection* c = get_object(self);

    bool file_exists = (access(StringValuePtr(db), R_OK) == 0);

    c->rc = SQLITE_OK;
    c->rc = sqlite3_open(StringValuePtr(db), &c->handle);

    //register_sql_functions(c->handle);

    // If the file already exists
    if (file_exists)
    {
        // sqlite3_open() will open anything and not complain. It does not check to
        // see if the file is a valid SQLite database. We need to know this now. So
        // we check to see if this is in fact a valid SQLite database file by
        // compiling a simple statement. The compilation alone will force SQLite to
        // go the the file for inforamtion, which will determine its validity. If
        // this statement does not compile, we don't have a valid database.

        const char* sql = "select count(*) from sqlite_master";
        sqlite3_stmt* stmt;
        c->rc = sqlite3_prepare(c->handle, sql, strlen(sql), &stmt, NULL);
        sqlite3_finalize(stmt);
    }

    return INT2FIX(c->rc);
}

VALUE m_close(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle != NULL)
    {
        c->rc = sqlite3_close(c->handle);

        // If rc != SQLITE_OK, then there is an unfinalized statement, and the
        // connection was not closed. We return c->rc to indicate this, so
        // caller at least can check for this condition.
        if (c->rc == SQLITE_OK)
        {
            // Closed. Set handle to NULL to indiciate this
            c->handle = NULL;
        }
    }
    else
    {
        c->rc = SQLITE_OK;
    }

    return INT2FIX(c->rc);
}

VALUE m_prepare(VALUE self, VALUE sql)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle == NULL)
    {
        c->rc = SQLITE_ERROR;

        return Qnil;
    }

    return make_sqlite3_stmt(self, c->handle, sql);
}

VALUE m_finalize(VALUE self, VALUE stmt_object)
{
    Check_Type(stmt_object, T_DATA);

    // Require that db be a C ext type
    Check_Type(stmt_object, T_DATA);

    // Require that db be of SQLite class
    if (rb_obj_is_instance_of(stmt_object, sqlite3_stmt_class()) == Qfalse)
    {
        rb_raise( rb_eRuntimeError,
                  "wrong argument type %s (expected %s)",
                  rb_obj_classname(stmt_object),
                  rb_class2name(cls)
                );
    }

    connection* c = get_object(self);
    c->rc = SQLITE_OK;

    statement* stmt;
    Data_Get_Struct(stmt_object, statement, stmt);

    c->rc = sqlite3_finalize(stmt->handle);

    // Set to NULL so it won't be finalized by destructor
    stmt->handle = NULL;

    return INT2FIX(c->rc);
}

VALUE m_begin(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle == NULL)
    {
        c->rc = SQLITE_ERROR;

        return Qnil;
    }

    c->rc = sqlite3_exec(c->handle, "BEGIN", NULL, NULL, NULL);

    return INT2FIX(c->rc);
}

VALUE m_commit(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle == NULL)
    {
        c->rc = SQLITE_ERROR;

        return Qnil;
    }

    c->rc = sqlite3_exec(c->handle, "COMMIT", NULL, NULL, NULL);

    return INT2FIX(c->rc);
}

VALUE m_rollback(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle == NULL)
    {
        c->rc = SQLITE_ERROR;

        return Qnil;
    }

    c->rc = sqlite3_exec(c->handle, "ROLLBACK", NULL, NULL, NULL);

    return INT2FIX(c->rc);
}

VALUE m_exec(VALUE self, VALUE sql)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    if (c->handle == NULL)
    {
        c->rc = SQLITE_ERROR;

        return Qnil;
    }

    Check_Type(sql, T_STRING);

    const char* zSQL = StringValuePtr(sql);

    c->rc = sqlite3_exec(c->handle, zSQL, NULL, NULL, NULL);

    return INT2FIX(c->rc);
}

VALUE m_insert_id(VALUE self)
{
    connection* c = get_object(self);

    ENSURE_CONNECTION(c)

    return INT2NUM(sqlite3_last_insert_rowid(c->handle));
}
