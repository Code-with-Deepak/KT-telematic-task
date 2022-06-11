var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var employeeLoginHandler = require('../controller/employee');


router.post('/login',async (req,res)=>{
    process.on('unhandledRejection', (reason, promise) => {
        // do something
      });
    var user = req.body.username || req.query.username;
    var pass = req.body.password || req.query.password;
    const result = await employeeLoginHandler.findOne({"username":user});
    console.log(result);
    if(result!=null){
    const findPass = result.password;
    const findEmail = result.username;
    const allowLoginemail = findEmail.includes(user);
    const allowLogin = findPass.includes(pass);
    console.log(allowLogin,allowLoginemail);
    if(allowLogin === true && allowLoginemail === true){
        const jwttoken = jwt.sign({user},process.env.JWT_SECRET_KEY)
        res.send({token:jwttoken,userName:user});
        res.redirect("employee/dashboard");
        console.log("Redirected");
    }
    else
    console.log("Error line 28");
    res.send({error:"Inc"});
    }
    else
    {
        console.log("registration path");
        if(employeeLoginHandler.create([{
            "username":user,
            "password":pass,
        }])){
            res.clearCookie("token");
            const jwttoken = jwt.sign({user},process.env.JWT_SECRET_KEY)
        res.send({token:jwttoken,userName:user});
        }
        else
        {
            res.send({error:"error in creating"});
        }

    }
})

module.exports = router;