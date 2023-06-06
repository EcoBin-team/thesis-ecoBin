require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");



//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Mount Supabase middleware
app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next();
});


// Routes


app.get('/', (req, res) => {
  res.send('Welcome my Freind!');
});





//Connect
app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});
