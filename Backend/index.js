require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabaseConnect/Supabase_Connect");
const ee = require("./routes/Depot_Routes")

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

app.use("/" , ee )
app.get('/', (req, res) => {
  res.send('Welcome my Freind!');
});




//Connect
app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});
