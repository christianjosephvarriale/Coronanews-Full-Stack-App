#ifndef RUBY_SQLITE_STMT_DECL
#define RUBY_SQLITE_STMT_DECL

typedef struct statement
{
    sqlite3_stmt* handle;
} statement;

void init_sqlite3_stmt(VALUE module);
VALUE sqlite3_stmt_class();
VALUE make_sqlite3_stmt(VALUE connection, sqlite3* db, VALUE sql);

#endif
