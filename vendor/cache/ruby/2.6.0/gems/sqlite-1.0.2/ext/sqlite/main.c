#include <ruby.h>

#include "ruby_sqlite3.h"
#include "ruby_sqlite3_stmt.h"

void Init_sqlite()
{
    VALUE mod = rb_define_module("SQLite");

    init_sqlite3(mod);
    init_sqlite3_stmt(mod);
}
