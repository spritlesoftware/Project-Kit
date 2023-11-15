
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
// const express = require('express');
// const twilio = require('twilio');

// const app = express();
// const port = 3000;

// // Twilio API key SID and secret from your Twilio account dashboard
// const apiKeySid = 'SK72cdcfd21bb8d6e9554082444ae21624';
// const apiKeySecret = 'hSTbkOGC4JDKBKMyt4hmCma9Gd5CHtPF';

// // Middleware to authenticate the Twilio access token
// app.use('/validate-token', (req, res, next) => {
//   const token = req.query.token;

//   try {
//     const decodedToken = jwt.AccessToken.verify(token, apiKeySecret);
//     req.identity = decodedToken.identity;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// // Endpoint that requires authentication
// app.get('/protected', (req, res) => {
//   res.json({ message: `Hello, ${res.identity}! You are authenticated.` });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
