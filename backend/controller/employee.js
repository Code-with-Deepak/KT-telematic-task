var mongoose = require('mongoose');

var EmployeeSchema = mongoose.Schema({
    username:{type:String,unquie:true},
    password:{type:String}
});

module.exports = mongoose.model("employee",EmployeeSchema);