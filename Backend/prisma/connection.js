const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log("Connected to Database.")
  }
  catch(error) {
    console.log(error)
  }
}

module.exports = connectDB
