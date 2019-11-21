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

        public Post ConvertPostFromJson(JToken jsonPost)
        {
            Post newPost = new Post
            {
                ID = jsonPost["id"].ToString(),
                Title = jsonPost["title"].ToString(),
                Content = jsonPost["selftext"].ToString(),
                Permalink = jsonPost["permalink"].ToString(),
                Link = jsonPost["url"].ToString(),
                AuthorName = jsonPost["author"].ToString(),
                Likes = Convert.ToInt32(jsonPost["ups"]),
                Thumbnail = jsonPost["thumbnail"].ToString(),
                Subreddit = jsonPost["subreddit"].ToString(),
                NSFW = Convert.ToBoolean(jsonPost["over_18"])
            };

            newPost.LinkType = LinkChecker.GetLinkType(newPost.Link);
            if (newPost.LinkType == "Youtube")
            {
                newPost.Link = LinkChecker.ConvertYoutubeLink(newPost.Link);
            }

            if (newPost.LinkType == "Streamable")
            {
                newPost.Link = LinkChecker.ConvertStreamableLink(newPost.Link);
                newPost.LinkType = "Youtube";
            }

            if(newPost.LinkType == "Twitch")
            {
                newPost.Link = LinkChecker.ConvertTwitchLink(newPost.Link);
            }

            // Convert gfycat and gifv to use reddit video
            if (newPost.LinkType == "Gfycat" || newPost.LinkType == "Gifv")
            {
                newPost.Link = jsonPost["preview"]["reddit_video_preview"]["fallback_url"].ToString();
                newPost.LinkType = "Video";
            }

            // For converting reddit videos
            if (Convert.ToBoolean(jsonPost["is_video"]) == true)
            {
                newPost.Link = jsonPost["secure_media"]["reddit_video"]["fallback_url"].ToString();
                newPost.LinkType = "Video";
            }
            return newPost;
        }

        /// <summary>
        /// Populate post list with the top reddit posts right now
        /// </summary>
        /// <returns></returns>
        public async Task PopulatePosts(string subreddit)
        {
            JObject json = await RedditConnector.GetJSONAsync("/r/" + subreddit + ".json");
            if (json["error"] == null)
            {
                int index = 1;
                foreach (var post in json["data"]["children"])
                {
                    var currentPost = post["data"];
                    Post newPost = ConvertPostFromJson(currentPost);
                    redditPosts.Add(newPost);
                    index++;
                }
            }
        }



        public async Task<Post> GetPost(string id, string subreddit)
        {
            JArray json = await RedditConnector.GetJSONArrayAsync("/r/" + subreddit + "/comments/" + id + ".json");
            if (json[0]["error"] == null)
            {
                var currentPost = json[0]["data"]["children"][0]["data"];
                Post post = ConvertPostFromJson(currentPost);
                post.Comments = new List<Comment>();
                // Get comments
                var currentComments = json[1]["data"]["children"];
                foreach(var comment in currentComments)
                {
                    if (comment["data"]["body"] == null || comment["data"]["author"] == null)
                        continue;

                    Comment newComment = new Comment()
                    {
                        Body = comment["data"]["body"].ToString(),
                        AuthorName = comment["data"]["author"].ToString()
                    };
                    post.Comments.Add(newComment);
                }

                return post;
            }
            return null;
        }

        // GET: api/<controller>?s=<subreddit>
        [HttpGet]
        public async Task<List<Post>> Get([FromQuery]string s)
        {
            await PopulatePosts(s);
            return redditPosts;
        }

        // GET api/<controller>/<id>?subreddit=<subreddit>
        [HttpGet("{id}")]
        public async Task<Post> Get(string id, [FromQuery]string subreddit)
        {
            Post post = await GetPost(id, subreddit);
            if(post == null)
            {
                // TODO: Log error
            }
            return post;
        }
    }
}
