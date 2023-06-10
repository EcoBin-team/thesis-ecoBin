require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");
//importing routes

const userRouter = require("./routes/routerUser")
const feedsRouter = require("./routes/routerfeeds")
const depotRouter = require("./routes/depotRouter")
const cartRouter = require("./routes/routerCart")

//requests handlers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({limit: "10mb"}));
app.use(cors());


//use routers
app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next()
})

app.use("/users", userRouter)
app.use("/", feedsRouter)
app.use("/depots", depotRouter)
app.use('/', cartRouter)





//connection
app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});
