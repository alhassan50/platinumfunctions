let admin = require("firebase-admin");

// Create a configuration object using environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

/* console.log('FB_ADMIN_SDK_PRIVATE_KEY:', process.env.FB_ADMIN_SDK_PRIVATE_KEY);
console.log('Processed private_key:', serviceAccount.private_key); */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;



/* let admin = require("firebase-admin");
const serviceAccount = require("../platinumhostels-f54e6-firebase-adminsdk-iyba9-05f000e11b.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db; */
