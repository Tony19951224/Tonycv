
const db = require('./db');
const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    adname: String,
    password: String,
    
    time: Date
})


var AdModel = mongoose.model('admin', adminSchema);


module.exports = AdModel;
