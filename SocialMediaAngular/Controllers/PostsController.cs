using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialMediaAngular.Controllers
{
    public class Post
    {
        public string title { get; set; }
        public string content { get; set; }
        public string author { get; set; }
    }

    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Post[]> Get()
        {
            Post post1 = new Post()
            {
                title = "Title",
                content = "Content",
                author = "Author"
            };

            Post post2 = new Post()
            {
                title = "Title1",
                content = "Content1",
                author = "Author1"
            };

            Post[] posts = new Post[] { post1, post2 };
            yield return posts;
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
