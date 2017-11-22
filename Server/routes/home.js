const User = require('../model/User');
const Film = require('../model/Film');
const Comment = require('../model/Comment');
var express = require('express');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
var router = express.Router();
var mongoose = require('mongoose');

exports.session = (req, res) => {


    if (req.session.user) {
        var session = req.session.user;
        res.json({ error: 0, session: session })
    } else {
        res.json({ error: 1, message: '请先登录吧!' })
    }
}

exports.register = (req, res, next) => {
    console.log(req.body);
    let name = req.body.username;
    let password = req.body.password;
    let error = '';
    if (!validator.matches(name, /^[a-zA-Z0-9_]{4,11}$/, 'g')) {
        error = '用户名不合法，以数字、字母开头';
    }
    if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{4,11}/, 'g')) {
        error = '密码不合法，长度为5-11';
    }
    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    }
    // console.log(req.body)
    User.findOne({ username: name }).then((user) => {
        // console.log(name);
        if (user) {
            return res.json({ error: 1, message: '用户名已存在' });
        }
        let newPsd = Dbset.encrypt(password, setting.PSDkey);
        req.body.password = newPsd;
        // console.log(req.body.password)
        req.body.avatar = 'http://5b0988e595225.cdn.sohucs.com/q_mini,c_zoom,w_640/images/20170802/9b5c38f0505d4b4f8ff166b5dca3bca0.jpeg';
        Dbset.addOne(User, req, res, '注册成功!!');

    }).catch((err) => {
        res.end(err);
    })
}

exports.login = (req, res, next) => {
    console.log(req.body);

    let name = req.body.username;
    let password = req.body.password;

    let error = '';

    if (!validator.matches(name, /^[a-zA-Z0-9_]{4,11}$/, 'g')) {
        error = '用户名不合法，以数字、字母开头';
    }
    if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{4,11}/, 'g')) {
        error = '密码不合法，长度为5-11';
    }

    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    }
    // 密码加密
    let newPsd = Dbset.encrypt(password, setting.PSDkey);
    req.body.password = newPsd;

    User.findOne({ username: name, }).then((user) => {

        if (!user) {
            return res.json({ error: 2, message: '用户名不存在,请注册' });
        }

        if (user.password != req.body.password) {
            return res.json({ error: 1, message: '密码错误,请重新输入' });
        }
        req.session.user = user
        res.json({ error: 0, message: '登录成功' })
        // console.log(req.session);
    }).catch((err) => {
        res.json({ error: 1, message: err });
    })
}

exports.logout = (req, res, next) => {
    req.session.user = null;
    console.log(req.session.user);
    res.json({ error: 0, message: '退出成功!' });
}

exports.show = (req, res, next) => {
    // console.log(req.body.name);

    var page = req.query.page;
    var page = parseInt(page);
    //   console.log(page);
    Film.find().skip(4 * page).limit(4).exec(function (err, film) {
        if (err) {
            return res.end(err);
        }
        res.json({ error: 0, film: film });

    })
}

exports.detailed = (req, res, next) => {
    // console.log(req.body.idd);
    Film.findOne({ '_id': req.body.idd.name }).exec(function (err, films) {
        if (err) {
            return res.end(err);
        }

        Comment.getAllComments(req.body.idd.name, (err, coms) => {

            if (err) {
                return res.end(err);
            }


            res.json({ error: 0, films: films, coms: coms });

        })


    })
}

exports.record = (req, res, next) => {
    Film.find().sort({ 'record': -1 }).exec(function (err, film) {

        if (err) {
            return res.end(err);
        }
        res.json({ error: 0, film: film });
    })
}

exports.score = (req, res, next) => {
    Film.find().sort({ 'score': -1 }).exec(function (err, film) {

        if (err) {
            return res.end(err);
        }
        res.json({ error: 0, film: film });
    })
}

exports.buy = (req, res, next) => {
    // console.log(req.body.i);
    // console.log(req.session.user);
    if (req.session.user) {

        Film.findOne({ '_id': req.body.i }).exec(function (err, film) {

            if (err) {
                return res.end(err);
            }
            // console.log(film)
            User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
                if (err) {
                    return res.end(err);
                }
                // console.log('添加成功')
                var Exist = false;
                users.movies.forEach(function (item, index) {
                    if (item._id == req.body.i) {
                        Exist = true;
                        item.amount += 1;
                        users.save();
                    }
                })
                if (!Exist) {
                    users.movies.push(film);
                    users.movies.forEach(function (item, index) {
                        if (item._id == req.body.i) {
                            Exist = true;
                            item.amount += 1;
                            users.save();
                        }
                    })
                }
                res.json({ error: 0 });
            })
        })
    } else {
        res.json({ error: 1, message: '请先登录吧!' })
    }


}

exports.car = (req, res, next) => {
    // console.log(111);
    // console.log(req.session.user._id);
    if (req.session.user) {
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            // console.log(users);
            if (users.movies.length > 0) {
                res.json({ error: 0, film: users.movies })
            } else {
                res.json({ error: 1, message: '购物车空的什么都找不到了 !' })
            }
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.json({ error: 1, message: '请先登录吧!' })
    }

}

exports.minus = (req, res, next) => {
    // console.log(req.body.ids);

    if (req.session.user) {
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            if (err) {
                return res.end(err);
            }
            users.movies.forEach(function (element, index) {
                if (element._id == req.body.ids) {
                    if (element.amount > 1) {
                        users.movies[index].amount--
                        users.save();
                        // console.log(users);
                        res.json({ error: 0, films: users.movies })
                    } else {
                        res.json({ error: 1, message: '再减就没了!!' })
                    }
                }
            })
        })
    } else {
        res.json({ error: 1, message: '请先登录吧!' })
    }
}

exports.add = (req, res, next) => {
    if (req.session.user) {
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            if (err) {
                return res.end(err);
            }
            users.movies.forEach(function (element, index) {
                if (element._id == req.body.ids) {
                    if (element.amount < 5) {
                        users.movies[index].amount++
                        users.save();
                        // console.log(users);

                        res.json({ error: 0, films: users.movies })
                    } else {
                        res.json({ error: 1, message: '每天只能选购5张!' })
                    }
                }
            })
        })
    } else {
        res.json({ error: 1, message: '请先登录吧!' })
    }

}

exports.del = (req, res, next) => {

    User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {

        users.movies.forEach(function (item, index) {

            if (item._id == req.body.ids) {

                users.movies.splice(index, 1);
                users.save();
            }
        })
        res.json({ error: 0, films: users.movies })
    })
}

exports.dot = (req, res, next) => {
    if (req.session.user) {
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            if (err) {
                return res.end(err);
            }
            var num = 0;
            users.movies.forEach(function (item, index) {


                num += item.amount;
                console.log(num)
            })
            // res.json({ error: 0, users: users.movies })
            res.json({ error: 0, num: num })
        })
    } else {
        var num = '';
        res.json({ error: 0, message: '请先登录吧!', num: num })
    }
}

exports.pay = (req, res, next) => {
    if (req.session.user) {
        // console.log(req.body.arr)
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            if (err) {
                return res.end(err);
            }
            req.body.arr.forEach(function (element, index) {

                element.bought = true;

                // console.log(element)
                users.paid.push(element);
                users.movies.forEach(function (item, ins) {
                    if (element._id == item._id) {
                        users.movies.splice(ins, 1);
                    }
                })
            })
            req.session.user = users;
            users.save();
            res.json({ error: 0, films: users.movies });
        })
    }
}

exports.comment = (req, res, next) => {
    // console.log(req.body.text);
    // console.log(req.body.i);
    if (req.session.user) {
        let content = validator.trim(req.body.text);
        if (content === '') {
            return res.json({ message: '内容不能为空!', error: 1 });
        }

        Film.findOne({ '_id': req.body.i }).exec(function (err, film) {
            if (err) {
                return res.end(err);
            }
            if (!film) {
                return res.json({ message: '电影已被删除', error: 1 });
            }
        })
        let comment = new Comment();
        comment.content = content;
        comment.commenter = req.session.user._id;

        comment.film_id = req.body.i;
        comment.save().then((comment) => {
            return comment;
        }).then((comment) => {
            User.getUserById(req.session.user._id, (err, user) => {
                if (err) {
                    return res.end(err);
                }
                user.score += 5;
                user.comment_num += 1;
                user.save();
                req.session.user = user;
            })
            return comment;
        }).then((comment) => {
            console.log(1)
            Comment.getCommentById(req.body.i, (err, com) => {


                com.comment_num += 1;
                com.last_reply_time = new Date();
                com.save();
            })

        }).then((comment) => {


            res.json({ error: 0, message: '评论成功!' });
        }).catch((err) => {
            res.end(err);
        })

    } else {
        res.json({ error: 1, message: '登陆后才可以评论!' });
    }


}

exports.pinglun = (req, res, next) => {

    Comment.getAllComments(req.body.i, (err, coms) => {

        if (err) {
            return res.end(err);
        }

        res.json({ error: 0, coms: coms })


    })

}

exports.revise = (req, res, next) => {

    if (req.session.user) {
        User.getUserById(req.body.id, (err, user) => {
            if (err) {
                return res.end(err);
            }
            user.avatar = req.body.url;
            req.session.user = user;
            user.save();

            res.json({ error: 0, message: '修改成功!', user: user })
        })
    } else {
        res.json({ error: 1, message: '登录后才可以修改!' })
    }

}

exports.xianshi = (req, res, next) => {
    // console.log(req.body.id);
    if (req.session.user) {
        User.getUserById(req.body.id, (err, user) => {
            if (err) {
                return res.end(err);
            }
            res.json({ films: user.paid });
        })

    }


}

exports.search = (req, res, next) => {
    // console.log(req.body.search);
    var search = req.body.search;
    var str = RegExp(search, 'i')
    Film.find({ filmname: str }).exec(function (err, film) {

        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        res.json({
            error: 0,
            film: film

        })
        // console.log(film)
    })
}

exports.remove = (req, res, next) => {
    // console.log(req.body.idd)
    if (req.session.user) {

        Comment.findOneAndRemove({ "last_reply_time": req.body.idd }).exec((err, com) => {
            if (err) {
                return res.end();
            }
            res.json({ error: 0, message: '删除成功!' });
        })
    } else {
        res.json({ error: 1, message: '请先登录吧!' });
    }


}

exports.clears = (req, res, next) => {
    if (req.session.user) {
        User.findOne({ '_id': req.session.user._id }).exec(function (err, users) {
            if (err) {
                return res.end(err);
            }

            users.movies.splice(0, users.movies.length);

            req.session.user = users;
            users.save();

            res.json({ error: 0, films: users.movies });
        })
    }
}

// exports.shouye = (req, res, next) => {
//     console.log('123')
//     console.log(req.session.user)
// }