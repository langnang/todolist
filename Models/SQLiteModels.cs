using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class UserModel
    {
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // 用户uuid
        public string name { get; set; } // 用户名称
        public string password { get; set; } // 密码
        public DateTime datetime { get; set; } // 创建时间 
    }

    public class ToDoModel
    {
        public int id { get; set; } // 主键ID
        public string uuid { get; set; } // uuid
        public string name { get; set; } // 标题
        public string content { get; set; } // 内容
        public bool state { get; set; } // 状态 
        public DateTime create_time { get; set; } // 创建时间
        public DateTime update_time { get; set; } // 更新时间
    }

    public class TokenModel
    {
        public int ID { get; set; } // 主键ID
        public int token { get; set; } // 

    }
}
