var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "amount": Number,
    "cost": Number,
    "url": String,
    "filmname": String,
    "ename": String,
    "type": String,
    "country": String,
    "score": Number,
    "record": Number,
    "abstract": String,
    "bought": {
        type: Boolean,
        default: false
    },
    

});
module.exports = mongoose.model('Film', productSchema);
