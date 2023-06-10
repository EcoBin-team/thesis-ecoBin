require("dotenv").config()
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth")

const { app, storage } = require("../firebase/FirebaseApp")
const supabase = require("../supabase/Supabase_Connect")

module.exports = {
  
  // method to retrieve all users in the database
  getAll: async (req,res) => {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    
    res.send(data)
  }, 

  // method to create a user in the database
  signUp: async (req,res) => {
    try{

      const { email, password, name } = req.body
      const auth = getAuth()

      // creating and storing the user in firebase auth
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      // inserting a row with the new user with the id that firebase returned
      const { data, error } = await supabase
      .from("users")
      .insert({
        id: user.uid,
        name: name,
        email: email,
      })
      
      res.send("Account Created!")
    }

    catch(error) {
      const errorCode = error.code
      res.send(errorCode)
    }
  },

  // login function to return the id and a token
  login: async (req,res) => {
    
    try{

      const { email, password } = req.body
      const auth = getAuth()

      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      const id = user.uid
      const token = user.stsTokenManager.accessToken
      res.send({id, token})

    }
    catch(error){
      const errorCode = error.code
      res.send(errorCode)
    }
  },

  uploadImage: async (req,res) => {

    const { image } = req.body

    const response = await fetch(image.uri)
    const blob = await response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf("/")+1)
    var ref = storage.ref().child(filename).put(blob)

    try{
      await ref
      res.send("image uploaded")
    }
    catch(error){
      console.log(error)
      res.send("upload failed")
    }

  },
  getUserById: async (req, res) => {
    const { id } = req.params;
  
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
  
    if (error) {
      res.status(500).send(error);
    } else {
      if (data.length === 1) {
        res.send(data[0]); // Return the single user object
      } else if (data.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(500).send("Multiple users found"); // Handle the case of multiple users with the same ID
      }
    }
  },

}