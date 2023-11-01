const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    author:String,
    genres:String,
    userId:String,
    excerpt:String
});

module.exports = mongoose.model("products",productSchema); 