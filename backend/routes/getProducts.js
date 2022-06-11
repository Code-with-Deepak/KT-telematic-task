var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var products = require('../controller/product');

router.get('/:employee/getProducts',async (req,res)=>{
    process.on('unhandledRejection', (reason, promise) => {
        // do something
      });
     const username = req.params.employee;
     console.log(username);
    const result = await products.find({"uploaded_by":username});
    console.log(result);
        if(result!=[]){
        res.send(result);
        console.log("Redirected");
    }
})

module.exports = router;