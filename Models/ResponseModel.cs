using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class ResponseModel
    {
        public int status { get; set; }
        public string statusText { get; set; }
        public object data { get; set;}

        
    }
}
