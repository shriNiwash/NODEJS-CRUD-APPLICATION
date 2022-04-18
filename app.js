const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('./model/db');
const CrudModel = require('./model/schema');
const bodyparser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const async = require('hbs/lib/async');
const port  = 3000;

app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));

const staticPath = path.join('__dirname',"../public");
console.log(staticPath);
app.use(express.static(staticPath));

//views engine

app.set('view engine','hbs');
app.set('views','./views');

app.get("/",(req,res)=>{
    res.render('insert');
})

app.post('/details',(req,res)=>{
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;

    const insertDatas = new CrudModel({
        name : `${name}`,
        address: `${address}`,
        phone: phone,
        email : `${email}`
    })
    insertDatas.save().then(()=>console.log("one row is inserted")).catch((err)=>console.log(err));
    res.redirect('details');
});

app.get("/details",async(req,res)=>{
    try{
        const datas = await CrudModel.find();
        res.render('lists',{
            list : datas,
        });
    }
    catch(err){
        console.log(err);
    }

});

app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id;
    CrudModel.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log(docs);
            console.log(req.params.id);
            res.render('update',{
                dataList:docs,
                ide:req.params.id,
            });   
        }
    });
  
});

app.post("/edit/:id",async(req,res)=>{
    try{
    const result = await CrudModel.findByIdAndUpdate(req.params.id,req.body);
    console.log(result);
    console.log(req.body);
    res.redirect('/details');
    }
    catch(err){
    console.log(err);
    }
})

app.get("/delete/:id",(req,res)=>{
    const ids = req.params.id;
    res.render('delete',{da:ids});
})

app.post("/delete/:id",async(req,res)=>{
    try{
        const resut = await CrudModel.findByIdAndDelete(req.params.id);
        console.log(resut);
        console.log("deleted");
        res.redirect('/details');
    }
    catch(error){
        console.log(error);
    }

})




app.listen(port,()=>console.log(`The application is running on the port ${port}`));