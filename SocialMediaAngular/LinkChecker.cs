using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SocialMediaAngular
{
    public class LinkChecker
    {
        public static string ConvertYoutubeLink(string url)
        {
            string videoID = url.Split(new string[] { "v=" }, StringSplitOptions.None)[1]; // Get ID and variables
            if (videoID == null)
                videoID = url.Split(new string[] { "e/" }, StringSplitOptions.None)[1]; // If there is no v= in the link, just separate with a slash

            int endPoint = videoID.IndexOf("&"); // Find start of variables (time to start video, end video, etc.)
            if (endPoint != -1)
            { // If there are any vars
                videoID = videoID.Substring(0, endPoint); // Get 12 digit video ID and leave out vars
            }
            string newUrl = "https://www.youtube.com/embed/" + videoID;// Youtube by default has links that do not work in an iframe, we have to convert them using /embed/
            return newUrl;
        }

        public static string ConvertGfycatLink(string url)
        {
            string routeData = url.Split(new string[] { ".com/" }, StringSplitOptions.None)[1];
            string newUrl = "https://giant.gfycat.com/" + routeData + ".webm";
            return newUrl;
        }

        public static string ConvertStreamableLink(string url)
        {
            string routeData = url.Split(new string[] { ".com/" }, StringSplitOptions.None)[1];
            string newUrl = "https://streamable.com/s/" + routeData;
            return newUrl;
        }

        public static string ConvertTwitchLink(string url)
        {
            string routeData = url.Split(new string[] { ".tv/" }, StringSplitOptions.None)[1];
            string newUrl = "https://clips.twitch.tv/embed?clip=" + routeData;
            return newUrl;
        }


        public static string GetLinkType(string url)
        {
            if (string.IsNullOrEmpty(url))
                return "Text";

            if (CheckIfImage(url))
                return "Image";
            else if (CheckIfVideo(url))
                return "Video";
            else if (CheckIfYoutube(url))
                return "Youtube";
            else if (CheckIfGfycat(url))
                return "Gfycat";
            else if (CheckIfGifv(url))
                return "Gifv";
            else if (CheckIfStreamable(url))
                return "Streamable";
            else if (CheckIfTwitch(url))
                return "Twitch";

            return "default";
        }

        private static bool CheckIfImage(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"\.(jpeg|jpg|gif|png)$");
            Match match = regex.Match(url);
            return match.Success;
        }


        private static bool CheckIfVideo(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"\.(webm|mp4)$");
            Match match = regex.Match(url);
            return match.Success;
        }

        private static bool CheckIfStreamable(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"(streamable)");
            Match match = regex.Match(url);
            return match.Success;
        }

        private static bool CheckIfTwitch(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"(clips.twitch.tv)");
            Match match = regex.Match(url);
            return match.Success;
        }

        private static bool CheckIfGifv(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"\.(gifv)$");
            Match match = regex.Match(url);
            return match.Success;
        }

        private static bool CheckIfYoutube(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})");
            Match match = regex.Match(url);
            return match.Success;
        }

        private static bool CheckIfGfycat(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            Regex regex = new Regex(@"(?:https?:\/\/)(?:www)?\.?(?:gfycat)(?:\.com)");
            Match match = regex.Match(url);
            return match.Success;
        }
    }
}
