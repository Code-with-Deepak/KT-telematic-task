var express = require('express');
var app = express();
var db = require('./models/db.js').connect();
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

var employeeLogin = require('./routes/employeeLoginHandler');
var employeeOperations = require('./routes/employeeOperations.js');
var getProducts = require('./routes/getProducts');

app.use(cors());

app.use(express.static('./public'));
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post('/login',employeeLogin);
app.use("/",employeeOperations);
app.use('/',getProducts);


app.listen(process.env.PORT,console.log("http://localhost:"+process.env.PORT));