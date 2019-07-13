using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SocialMediaAngular;
using SocialMediaAngular.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialMediaAngular.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private List<Post> redditPosts = new List<Post>();

        public async Task PopulatePosts()
        {
            JObject json = await RedditConnector.GetJSONAsync("/r/all/.json");
            if (json["error"] == null)
            {
                int index = 1;
                foreach (var post in json["data"]["children"])
                {
                    var currentPost = post["data"];
                    Post newPost = new Post
                    {
                        ID = index,
                        Title = currentPost["title"].ToString(),
                        Content = currentPost["selftext"].ToString(),
                        Permalink = currentPost["permalink"].ToString(),
                        Link = currentPost["url"].ToString(),
                        AuthorName = currentPost["author"].ToString(),
                        Likes = Convert.ToInt32(currentPost["ups"]),
                        Thumbnail = currentPost["thumbnail"].ToString()
                    };

                    newPost.LinkType = LinkChecker.GetLinkType(newPost.Link);
                    if (newPost.LinkType == "Youtube")
                    {
                        newPost.Link = LinkChecker.ConvertYoutubeLink(newPost.Link);
                    }
                    
                    // Convert gfycat and gifv to use reddit video
                    if (newPost.LinkType == "Gfycat" || newPost.LinkType == "Gifv")
                    {
                        newPost.Link = currentPost["preview"]["reddit_video_preview"]["fallback_url"].ToString();
                        newPost.LinkType = "Video";
                    }

                    // For converting reddit videos
                    if (Convert.ToBoolean(currentPost["is_video"]) == true)
                    {
                        newPost.Link = currentPost["secure_media"]["reddit_video"]["fallback_url"].ToString();
                        newPost.LinkType = "Video";
                    }

                    redditPosts.Add(newPost);
                    index++;
                }
            }
            else
            {
                // TODO: Log error
            }
        }        

        // GET: api/<controller>
        [HttpGet]
        public async Task<List<Post>> Get()
        {
            await PopulatePosts();
            return redditPosts;
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
