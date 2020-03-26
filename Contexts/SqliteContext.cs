using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Contexts
{
    public class SqliteContext:DbContext
    {
        public SqliteContext(DbContextOptions<SqliteContext> Options) : base(Options)
        {
        }
        public DbSet<UserModel> user { get; set; }
    }
}
