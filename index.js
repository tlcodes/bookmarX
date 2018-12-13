const express = require("express");
const path = require("path");
const cors = require('cors');
const axios = require("axios");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

const FLICKR_API_KEY = "YOUR_FLICKR_API_KEY";
const VIMEO_TOKEN = "YOUR_VIMEO_TOKEN";

// test
app.get("/api/me", cors(), (req, res) => {
  console.log("api/me got hit!");
  res.send("hey you!");
});

// get flickr photo info
app.get("/api/photo/:photoId", cors(), async (req, res, next) => {
  let photoId = req.params.photoId;
    try {
      const photoInfos = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      const photoSizes = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      let linkInfos = photoInfos.data.photo;
      let dimensions = photoSizes.data.sizes.size.pop();
      let link = {
        id: "p" + linkInfos.id,
        url: linkInfos.urls.url[0]._content,
        title: linkInfos.title._content,
        author: linkInfos.owner.realname,
        date: new Date(linkInfos.dateuploaded * 1000)
          .toString()
          .substring(4, 15),
        width: dimensions.width,
        height: dimensions.height,
        tags: []
      };
      res.json(link);
    } catch (error) {
      console.log(error);
      next(error);
    }
});

// get video info
app.get("/api/video/:videoId", cors(), async (req, res, next) => {
  let videoId = req.params.videoId;
    try {
      const videoInfos = await axios.get(
        `https://api.vimeo.com/videos/${videoId}?access_token=${VIMEO_TOKEN}`
      );
      const linkInfos = videoInfos.data;
      let link = {
        id: "v" + videoId,
        url: linkInfos.link,
        title: linkInfos.name,
        author: linkInfos.user.name,
        date: new Date(linkInfos.created_time).toString().substring(4, 15),
        width: linkInfos.width,
        height: linkInfos.height,
        duration: new Date(linkInfos.duration * 1000)
          .toISOString()
          .substring(11, 19),
        tags: []
      };
      res.json(link);
    } catch (error) {
      console.log(error);
      next(error);
    }
});

// fallback for any other get request endpoint
app.get("*", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
