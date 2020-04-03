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
            var auth = new AuthModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            try { 
                auth = _context.Auth.Single(a => a.token == HttpContext.Session.GetString("token"));
            }
            catch (Exception ex) {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data= data,
                };
            }
            var list = _context.ToDo.Where(item => item.uuid == auth.uuid).ToList().OrderByDescending(item=>item.datetime);
            data["list"] = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data
            };
        }
        // POST api/<controller>/insert
        [HttpPost("Insert")]
        public ActionResult<ResponseModel> PostInsert([FromBody]RequestModel req)
        {
            var todo = new ToDoModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            var token = new AuthModel();
            try
            {
                todo.name = (string)req.data["name"];
                todo.content = (string)req.data["content"];
                if ((string)req.data["token"]["token"] != HttpContext.Session.GetString("token")) {
                    throw new Exception();
                }
                token.id = (int)req.data["token"]["id"];
                token.token = (string)req.data["token"]["token"];
                token = _context.Auth.Single(item => item.id == token.id && item.token == token.token);
                todo.uuid = token.uuid;
                 todo.name = (string)req.data["name"];
                 todo.content = (string)req.data["content"];
                 todo.datetime = DateTime.Now;
                _context.ToDo.Add(todo);
                _context.SaveChanges();
                todo = _context.ToDo.Single(item => item.name == todo.name && item.content == todo.content && item.datetime == todo.datetime);
                data["id"] = todo.id;
                data["name"] = todo.name;
                data["content"] = todo.content;
                data["datetime"] = todo.datetime;
            }
            catch (Exception ex) {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data = data
                };
            }

            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data,
            };
        }
        // POST api/<controller>/delete
        [HttpPost("Delete")]
        public ActionResult<ResponseModel> PostDelete([FromBody]RequestModel req)
        {
            var todo = new ToDoModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            var token = new AuthModel();
            try
            {
                todo.id = (int)req.data["id"];
                if ((string)req.data["token"]["token"] != HttpContext.Session.GetString("token"))
                {
                    throw new Exception();
                }
                token.id = (int)req.data["token"]["id"];
                token.token = (string)req.data["token"]["token"];
                token = _context.Auth.Single(item => item.id == token.id && item.token == token.token);
                todo.uuid = token.uuid;
                _context.ToDo.Remove(todo);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data = data
                };
            }

            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data,
            };
        }
        // POST api/<controller>/update
        [HttpPost("update")]
        public ActionResult<ResponseModel> PostUpdate([FromBody]RequestModel req)
        {
            var _todo = new ToDoModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            var token = new AuthModel();
            try
            {
                token.id = (int)req.data["token"]["id"];
                token.token = (string)req.data["token"]["token"];
                if (token.token != HttpContext.Session.GetString("token"))
                {
                    throw new Exception();
                }
                token = _context.Auth.Single(item => item.id == token.id && item.token == token.token);

                _todo.id = (int)req.data["id"];
                _todo.uuid = token.uuid;
                var todo = _context.ToDo.Single(item => item.id == _todo.id && item.uuid == _todo.uuid);

                todo.name = (string)req.data["name"];
                todo.content = (string)req.data["content"];
                todo.datetime = DateTime.Now;
                
                _context.SaveChanges();

                data["id"] = todo.id;
                data["uuid"] = todo.uuid;
                data["name"] = todo.name;
                data["content"] = todo.content;
                data["datetime"] = todo.datetime;
            }
            catch (Exception ex)
            {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data = data
                };
            }

            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data,
            };
        }
    }
}
