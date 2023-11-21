
const express = require('express');
const twilio = require('twilio');
const ngrok = require('ngrok')
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const dotenv = require("dotenv")
dotenv.config()

const app = express();
const port = 3000;

app.get('/getToken', (req, res) => {
  if (!req.query || !req.query.userName) {
    return res.status(400).send('Username parameter is required');
  }
  const accessToken = new AccessToken(
    process.env.ACCOUNT_SID,
    process.env.API_KEY_SID,
    process.env.API_KEY_SECRET,
    { identity: "Janani" },
  );
  
  // Set the Identity of this token
  accessToken.identity = req.query.userName;

  // Grant access to Video
  var grant = new VideoGrant();
  accessToken.addGrant(grant);

  // Serialize the token as a JWT
  var jwt = accessToken.toJwt();
  return res.send(jwt);
});
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);

ngrok.connect(port).then((url) => {
  console.log(`Server forwarded to public url ${url}`);
});
