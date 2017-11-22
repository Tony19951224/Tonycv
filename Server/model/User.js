const mongoose = require('mongoose');
const shortid = require('shortid');
const DbSet = require('./db')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户的ID
    _id: {
        type: String,
        default: shortid.generate,
        unique: true //id经常会被查询，所以，把ID作为索引
    },
    //用户名
    username: {
        type: String,
        require: true
    },
    //密码
    password: {
        type: String,
        require: true
    },


    //个人头像
    avatar: {
        type: String,

    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    // 更新时间
    update_time: {
        type: Date,
        default: Date.now
    },

    // 回复数量
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

// 设置静态方法
UserSchema.statics = {
    /// 通过id查找用户，并返回数据
    getUserById: (id, callback) => {
        User.findOne({ '_id': id }).then((user) => {
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
    // 通过name查找用户
    getUserByName: (name, callback) => {
        User.findOne({ 'name': name }).then((user) => {
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },

    // 通过多个名称，获取多个用户信息  $in
    //  { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
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







