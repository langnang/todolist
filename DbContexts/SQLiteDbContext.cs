using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.DbContexts
{
    public class SQLiteDbContext:DbContext
    {
        public SQLiteDbContext(DbContextOptions<SQLiteDbContext> Options) : base(Options)
        {
        }
        public DbSet<UserModel> User { get; set; }
        public DbSet<AuthModel> Auth { get; set; }
        public DbSet<ToDoModel> ToDo { get; set; }
        public DbSet<LogModel> Log { get; set; }
    }

}
