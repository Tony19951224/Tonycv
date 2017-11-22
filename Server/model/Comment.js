const mongoose = require('mongoose');
const shortid = require('shortid');
const DbSet = require('./db')
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    // 回复的内容
    content: {
        type: String,
        require: true
    },

    create_time: {
        type: Date,
        default: Date.now
    },
    // 回复的那个人
    commenter: {
        type: String,
        ref: 'User'
    },

    deleted: {
        type: Boolean,
        default: false
    },
    film_id: {
        type: String,
        ref: 'Film',
    },
    comment_num: {
        type: Number,
        default: 0,
    },
    last_reply_time: {
        type: Date,
        default: Date.now
    },

})

CommentSchema.statics = {
    // 通过id查找当前文章
    getCommentById: (id, callback) => {
        // populate() 关联查询 --- 查询并获取参考集合的数据
        Comment.findOne({ 'film_id': id, deleted: false }).then((comment) => {
            // 判断文章是否存在
            if (!comment) {
                return callback(null, '文章不存在或已删除')
            }


        }).catch((err) => {
            callback(err);
        })
    },
    // 获取所有的文章列表
    getAllComments: (id, callback) => {

        Comment.find({ 'film_id': id }, { deleted: false }).sort({ 'create_time': -1 }).populate('commenter').then((comment) => {
            callback(null, comment);
        }).catch((err) => {
            callback(err);
        })
    },

}

CommentSchema.methods.create_time_ago = function () {

    let time = moment(this.create_time).fromNow();
    return time;
}
const Comment = mongoose.model('Reply', CommentSchema);

module.exports = Comment;










