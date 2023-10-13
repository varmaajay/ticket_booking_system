const express = require('express');
const mongoose = require('mongoose');

const bodyparser = require('body-parser')

const app = express();

app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/admin_panel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("connection sucuufuuly")
});
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// app.get('/', function(req,res){
//     res.send("hello word")
// })
const adminRoute = require('./routes/adminroute');
app.use(adminRoute);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});