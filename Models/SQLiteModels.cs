using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class UserModel
    {
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // uuid
        public string name { get; set; } // 用户名称
        public string password { get; set; } // 密码
        public DateTime datetime { get; set; } // 创建时间 
    }
    public class AuthModel
    {
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // uuid
        public string token { get; set; } // 
        public DateTime datetime { get; set; } // 创建时间 
    }

    public class ToDoModel
    {
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // uuid
        public string name { get; set; } // 标题
        public string content { get; set; } // 内容
        public DateTime datetime { get; set; } // 创建时间
    }

    

    public class LogModel
    { 
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // uuid
        public string type { get; set; }
        public string table { get; set; }
        public string old_content { get; set; }
        public string new_content { get; set; }
        public DateTime datetime { get; set; } // 创建时间 
    }
}
