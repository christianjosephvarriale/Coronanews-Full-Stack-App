#ifndef RUBY_SQLITE_CONNECTION_DECL
#define RUBY_SQLITE_CONNECTION_DECL

#include "sqlite3.h"

void init_sqlite3(VALUE module);
VALUE sqlite3_class();
sqlite3* get_sqlite3_handle(VALUE self);
VALUE make_sqlite3_object(sqlite3* handle);

#endif
