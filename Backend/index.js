require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");
const userRouter = require("./routes/routerUser")
<<<<<<< HEAD
const feedsRouter = require("./routes/routerfeeds")
=======
const depotRouter = require("./routes/depotRouter")
const SearchRouter = require("./routes/searchRouter")
>>>>>>> 84ec412accdb99555283ae69c7c2d96e21fa3de0

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next();
});
app.use("/users", userRouter)
<<<<<<< HEAD
app.use("/", feedsRouter)
=======
app.use("/", depotRouter)
app.use("/", SearchRouter)





>>>>>>> 84ec412accdb99555283ae69c7c2d96e21fa3de0

app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});
