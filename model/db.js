const mongoose = require('mongoose');
const conn = "mongodb://127.0.0.1/crud";

mongoose.connect(conn,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("the connection is successfull")).catch((err)=>console.log(err));

