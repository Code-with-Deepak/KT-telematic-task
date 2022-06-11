var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    desc:{type:String},
    category:{type:String},
    available:{type:Number},
    uploded_by:{type:String},
});

module.exports = mongoose.model("product",productSchema);