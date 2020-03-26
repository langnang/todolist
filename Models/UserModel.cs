using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class UserModel
    {
        public int id { get; set; } // 主键ID
        public string uid { get; set; } // 用户uuid
        public string name { get; set; } // 用户名称
        public string password { get; set; } // 用户密码
    }
}
