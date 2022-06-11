var express = require('express');
var fs = require('fs');
var router = express.Router();
var products = require('../controller/product');
var jwt = require('jsonwebtoken');
const path = require('path');

router.post('/employee/addProducts',async(req,res)=>{
    var name = req.body.pname;
    var price = req.body.price;
    var desc = req.body.desc;
    var category = req.body.category;
    var available = req.body.available;
    var upby = req.body.upby;
    if(true)
    {
        if(products.create([{
            "name":name,
            "price":price,
            "desc":desc,
            "category":category,
            "available":available,
            "uploded_by":upby,

        }])){
        res.redirect('http://localhost:3000/employee/dashboard?added=success');
        logger = [];
        }
        else
        res.redirect('http://localhost:3000/employee/dashboard?added=error');
    }
})

router.delete('/employee/deleteProduct/:id/:prodname',async(req,res)=>{
    const id = req.params.id;
    const name = req.params.prodname;
    if(name!=null){
    products.deleteOne({"_id":id},(err,docs)=>{
        if(err)
        throw err;
        console.log("Product Deleted");
        res.send("product Deleted successfully");
    });
    }
    else{
    res.clearCookie('token');
    res.redirect("http://localhost:3000/employee/login?error=login");
    }
})

router.post('/employee/editProducts',async(req,res)=>{
    var id = req.body.id;
    var name = req.body.pname;
    var price = req.body.price;
    var desc = req.body.desc;
    var category = req.body.category;
    var available = req.body.available;
    const filter={_id:id};
    const update={
        "name":name,
        "price":price,
        "desc":desc,
        "category":category,
        "available":available,
    }
    if(name != null)
    {
        products.findOneAndUpdate(filter,update,{new:true},(err,docs)=>{
            if(err)
            throw err;
            res.redirect('http://localhost:3000/employee/dashboard?update=success');
        });
    }
    else{
    res.clearCookie('token');
    res.redirect("http://localhost:3000/employee/login?error=login");
    }
})

module.exports = router;