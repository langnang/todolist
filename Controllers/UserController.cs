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
        // POST:api/<controller>/register
        [HttpPost("register")]
        public ActionResult<ResponseModel> PostRegister([FromBody]RequestModel req)
        {
            var user = new UserModel
            {
                uuid = UUIDModel.GetUUID(),
                name = (string)req.data["name"],
                password = (string)req.data["password"],
                datetime = DateTime.Now
            };
            _context.User.Add(user);
            _context.SaveChanges();

            return new ResponseModel
            {
                status = 200,
                statusText = "success"
            };
        }
        // POST:api/<controller>/signin
        [HttpPost("signin")]
        public ActionResult<ResponseModel> PostSignIn([FromBody]RequestModel req)
        {
            var user = new UserModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            var token = new Newtonsoft.Json.Linq.JObject();
            var auth = new AuthModel();
            var _auth = new AuthModel();
            try
            {
                user = _context.User.Single(u => u.name == (string)req.data["name"] && u.password == (string)req.data["password"]);
                auth.uuid = user.uuid;
                auth.token = UUIDModel.GetUUID("N") + UUIDModel.GetUUID("N");
                auth.datetime = DateTime.Now;
                _context.Auth.Add(auth);
                _context.SaveChanges();

                _auth= _context.Auth.Single(a => a.token == auth.token);
            }
            catch (Exception ex)
            {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data=data
                };
            }
            data["uuid"] = user.uuid;
            data["name"] = user.name;
            token["id"] = _auth.id;
            token["token"] = _auth.token;
            data["token"]= token;
            HttpContext.Session.SetString("token", _auth.token);
            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data
            };
        }
        // POST:api/<controller>/signout
        [HttpGet("signout")]
        public ActionResult<ResponseModel> GetSignOut()
        {
            var data = new Newtonsoft.Json.Linq.JObject();
            try
            {
                HttpContext.Session.Clear();
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
                data=data
            };
        }
        // POST:api/<controller>/active
        [HttpGet("active")]
        public ActionResult<ResponseModel> GetActive()
        {
            var auth= new AuthModel();
            var user = new UserModel();
            var data = new Newtonsoft.Json.Linq.JObject();
            var token = new Newtonsoft.Json.Linq.JObject();
            try {
                auth = _context.Auth.Single(a => a.token == HttpContext.Session.GetString("token"));
                data["token"] = auth.token;
                if (auth.datetime > DateTime.Now.AddHours(6)) {
                    throw new Exception();
                }
                user = _context.User.Single(u => u.uuid == auth.uuid);
            }
            catch(Exception ex) {
                data["msg"] = ex.Message;
                return new ResponseModel
                {
                    status = 404,
                    statusText = "failure",
                    data = data
                };
            }
            data["uuid"] = user.uuid;
            data["name"] = user.name;
            token["id"] = auth.id;
            token["token"] = auth.token;
            data["token"] = token;

            return new ResponseModel
            {
                status = 200,
                statusText = "success",
                data = data
            };
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
                /*
                data = new UserModel
                {
                    id = _user.id,
                    uuid = _user.uuid,
                    name = _user.name,
                }
                */
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
                /*
                data = new UserModel
                {
                    id= user.id,
                    uuid = user.uuid,
                    name = user.name,
                }
                */
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
