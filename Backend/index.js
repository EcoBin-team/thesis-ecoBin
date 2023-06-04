const express = require('express');
const app = express();
const cors = require("cors");

const feedRouter = require("./routes/feedsRout");
const userRouter = require("./routes/routerUser")
const itemRouter = require("./routes/routerItem")
const depotRouter = require("./routes/routerDepot")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const connectDB = require("./prisma/connection");
// connectDB()


app.use("/feed", feedRouter)
app.use("/users", userRouter)
app.use("/items", itemRouter)
app.use("/depots", depotRouter)


  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });