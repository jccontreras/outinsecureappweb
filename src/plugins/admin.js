import admin from "firebase-admin";

const serviceAccount = require("/home/ragnarok/Documents/kajisa/private/outinsecureaw.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://outinaw-8f3ae-default-rtdb.firebaseio.com"
});