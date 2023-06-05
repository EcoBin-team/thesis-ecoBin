require("dotenv").config()
const { initializeApp } = require("firebase/app")

// firebase config with secret variables
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

const app = initializeApp(firebaseConfig) // initializing a firebase app to call in controllers

module.exports = app