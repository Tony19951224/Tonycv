const mongoose = require('mongoose');
const shortid = require('shortid');
const DbSet = require('./db')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    
    _id: {
        type: String,
        default: shortid.generate,
        unique: true  
    },
   
    username: {
        type: String,
        require: true
    },
    
    password: {
        type: String,
        require: true
    },


    
    avatar: {
        type: String,

    },
    
    create_time: {
        type: Date,
        default: Date.now
    },
    
    update_time: {
        type: Date,
        default: Date.now
    },

   
    reply_count: {
        type: Number,
        default: 0
    },
    paid: {
        type: Array
    }
    ,
    movies: [
        {
            "amount": Number,
            "cost": Number,
            "filmname": String,
            "bought": { type: Boolean, default: false },
            "url": String,
        }
    ],
    score: {
        type: Number,
        default: 0
    },
    comment_num: {
        type: Number,
        default: 0,
    }



})

 
UserSchema.statics = {
  
    getUserById: (id, callback) => {
        User.findOne({ '_id': id }).then((user) => {
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
   
    getUserByName: (name, callback) => {
        User.findOne({ 'name': name }).then((user) => {
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },

    
   
    getUsersByNames: (users, callback) => {
        User.find({ name: { $in: users } }).then((users) => {
            callback(null, users);
        }).catch((err) => {
            callback(err);
        })
    }
}


const User = mongoose.model('User', UserSchema);
module.exports = User;







