const mongoose  = require('mongoose');

//creating schema

const crudSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    address : {
        type:String,
        required : true
    },
    phone : {
        type:Number,
        required : true
    },
    email : {
        type : String,
        unique:true,
    }

});

//creating model 
const CrudModel = new mongoose.model('CrudModel',crudSchema);


module.exports = CrudModel;