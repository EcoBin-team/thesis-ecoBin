const express = require('express');
const app = express();
const cors = require("cors");

const feedRouter = require("./routes/feedsRout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const connectDB = require("./prisma/connection");
connectDB()


app.use(feedRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });