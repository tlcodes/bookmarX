BookmarX - React/Redux/NodeJS bookmark management app for Flickr and Vimeo links.
The app is ready to be deployed on heroku. [Live Demo](https://still-temple-47849.herokuapp.com/)

The root directory includes an index.js file, which starts our server.
This file will safely contain your API keys without exposing them on the client side.

** Clone or download the repository **
> git clone https://github.com/tlcodes/bookmarX.git

 ** Install dependencies, in the root directory AND the client directory ** (yes, twice)
> npm install

** Edit the index.js file in the root directory and add your own API keys: **

for Flickr, create an app at https://www.flickr.com/services/api/, then copy/paste your key: 
const FLICKR_API_KEY = "YOUR_FLICKR_KEY";

For Vimeo, create an app at https://developer.vimeo.com, then **generate a token with public scope ONLY**. Paste your token in the index.js file:
const VIMEO_TOKEN = "YOUR_VIMEO_TOKEN"

** Start the app with npm start **

Note: The number of links per page is set to 2. It can be adjusted within the src/reducers/appReducer.js file:
> const initialState = {
>   ...
>   linksPerPage: 2,
>   ...
>}

** Deploy on heroku **
The app was created with npm so the heroku postbuild script is
>"heroku-postbuild": "cd client && npm install && npm run build"

If you use yarn, replace with:
>"heroku-postbuild": "cd client && yarn && yarn run build"

Make sure you stop the dev server and app.
In the root directory (not the client directory of the React app),
create a heroku repo and deploy
>heroku create

>git push heroku master