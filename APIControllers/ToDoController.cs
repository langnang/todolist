using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ToDoList.DbContexts;
using ToDoList.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoList.APIControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : Controller
    {
        private readonly SQLiteDbContext _context;

        public ToDoController(SQLiteDbContext context)
        {
            _context = context;
        }

        // GET api/<controller>/list
        [HttpGet("List")]
        public ActionResult<ResponseModel> GetList()
        {
            var uuid=HttpContext.Session.GetString("uuid");
            if (string.IsNullOrEmpty(uuid))
            {
                return new ResponseModel
                {
                    status=404,
                    statusText="failure"
                };
            }
            var _list=_context.ToDo.Where(tb => tb.uuid == uuid);
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = _list
            };
        }
        // POST api/<controller>/insert
        [HttpPost("Insert")]
        public ActionResult<ResponseModel> PostInsert([FromBody]ToDoModel _todo)
        {
            var uuid = HttpContext.Session.GetString("uuid");
            if (string.IsNullOrEmpty(uuid))
            {
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure"
                };
            }
            _todo.uuid = uuid;
            _todo.create_time = DateTime.Now;
            _todo.update_time = DateTime.Now;
            _context.ToDo.Add(_todo);
            _context.SaveChanges();
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = _todo
            };
        }
        // POST api/<controller>/insert
        [HttpPost("Delete")]
        public ActionResult<ResponseModel> PostDelete([FromBody]ToDoModel _todo)
        {
            var uuid = HttpContext.Session.GetString("uuid");
            if (string.IsNullOrEmpty(uuid))
            {
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure"
                };
            }
            var todo = _context.ToDo.Single(tb => tb.id == _todo.id && tb.uuid == uuid);
            _context.ToDo.Remove(todo);
            _context.SaveChanges();
            return new ResponseModel
            {
                status = 200,
                statusText = "success"
            };
        }
        // POST api/<controller>/update
        [HttpPost("Update")]
        public ActionResult<ResponseModel> PostUpdate([FromBody]ToDoModel _todo)
        {
            var uuid = HttpContext.Session.GetString("uuid");
            if (string.IsNullOrEmpty(uuid))
            {
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure"
                };
            }
            var todo = _context.ToDo.Single(tb => tb.id == _todo.id&&tb.uuid==uuid);
            if (
                todo.state == _todo.state 
                && todo.name == _todo.name 
                && todo.content == _todo.content) {
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure"
                };
            }
            todo.state = _todo.state;
            todo.name = _todo.name;
            todo.content = _todo.content;
            todo.update_time = DateTime.Now;
            _context.SaveChanges();
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = todo
            };
        }
    }
}
