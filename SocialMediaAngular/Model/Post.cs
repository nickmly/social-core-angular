﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMediaAngular.Model
{
    public class Post
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string AuthorName { get; set; }
        public string Link { get; set; }
        public string Permalink { get; set; }
        public int Likes { get; set; }
        public string LinkType { get; set; }
    }
}
