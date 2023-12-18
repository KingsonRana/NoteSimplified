require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 6001

const mongoose = require("mongoose");
const mongoDB=process.env.MONGO;

mongoose.connect(mongoDB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

 app.use(cors())
 app.use(express.json())
 app.use('/api/auth',require('./routes/auth'))
 app.use('/api/notes',require('./routes/notes'))


app.listen(PORT,()=>{
    console.log("Server is running on port number : 6001");
})