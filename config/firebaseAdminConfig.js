let admin = require("firebase-admin");
let serviceAccount = require("../platinumhostels-f54e6-firebase-adminsdk-iyba9-05f000e11b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()

module.exports = db
