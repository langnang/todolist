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
    public class UserController : Controller
    {
        private readonly SQLiteDbContext _context;

        public UserController(SQLiteDbContext context)
        {
            _context = context;
        }
        // POST:api/<controller>/insert
        [HttpPost("insert")]
        public ActionResult<ResponseModel> PostInsert([FromBody]UserModel _user)
        {
            _user.uuid = UUIDModel.GetUUID();
            _user.datetime = DateTime.Now;
            _context.User.Add(_user);
            _context.SaveChanges();


            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = new UserModel
                {
                    id = _user.id,
                    uuid = _user.uuid,
                    name = _user.name,
                }
            };
        }
        // POST:api/<controller>/select
        [HttpPost("select")]
        public ActionResult<ResponseModel> PostSelect([FromBody]UserModel _user)
        {
            // _user.uuid = UUIDModel.GetUUID();
            // var user = _context.User.Single(tb => tb.name == _user.name);
            var has=_context.User.Any(u => u.name == _user.name);
            if (!has) {
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                };
            }
            var user = _context.User.Single(u => u.name == _user.name);
            HttpContext.Session.SetString("uuid", user.uuid);
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = new UserModel
                {
                    id= user.id,
                    uuid = user.uuid,
                    name = user.name,
                }
            };
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
