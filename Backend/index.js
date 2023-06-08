require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");
const userRouter = require("./routes/routerUser")
const depotRouter = require("./routes/depotRouter")

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({limit: "10mb"}));
app.use(cors());

app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next();
});
app.use("/users", userRouter)
app.use("/", depotRouter)







app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});
