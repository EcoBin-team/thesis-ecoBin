require("dotenv").config()
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth") 

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const { app } = require("../firebase/FirebaseApp") 

module.exports = {
  
  //method to retrieve all users in the database
  getAll: async (req,res) => {
    const users = await prisma.user.findMany()
    res.send(users)
  }, 

  // method to create a user in the database
  signUp: async (req,res) => {
    try{

      const { email, password, name } = req.body
      const auth = getAuth()
  
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      const newUser = await prisma.user.create({
        data: {
          id: user.uid,
          email: email,
          name: name,
        }
      })
      res.send(newUser)
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
  }

}