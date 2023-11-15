const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const twilioAccountSid = "AC6cfdcfa2797577086d7107e18f48eaa5";
const twilioApiKey = "SK72cdcfd21bb8d6e9554082444ae21624";
const twilioApiSecret =  "hSTbkOGC4JDKBKMyt4hmCma9Gd5CHtPF";

const identity = 'Janani';

// Create Video Grant
const videoGrant = new VideoGrant({
  room: 'my room',
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);
token.addGrant(videoGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());