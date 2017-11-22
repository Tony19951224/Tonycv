var express = require('express');
var router = express.Router();
var Film = require('../model/Film');
var crypto = require('crypto');
const AdModel = require('../model/admin');


// router.get('/update', function (req, res, next) {
//     res.render('update', { title: 'sss' })
// })

exports.update = (req, res) => {
    res.render('update', {
        title: '上传电影',
        aduser: req.session.adname,

    })
}


// 电影更新
exports.updates = (req, res) => {
    var product = new Film({
        amount: req.body.amount,
        url: req.body.url,
        cost: req.body.price,
        filmname: req.body.name,
        ename: req.body.ename,
        type: req.body.type,
        country: req.body.country,
        score: req.body.score,
        record: req.body.record,
        abstract: req.body.intro,
    })
    // console.log(222)
    product.save(function (err) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        res.json({ error: 0, message: '商品添加成功' })
    })

}

// router.post('/update', function (req, res, next) {
//     // console.log('111')
//     console.log(req.body);
//     var product = new Film({
//         amount: req.body.amount,
//         url: req.body.url,
//         cost: req.body.price,
//         filmname: req.body.name,
//         ename: req.body.ename,
//         type: req.body.type,
//         country: req.body.country,
//         score: req.body.score,
//         record: req.body.record,
//         abstract: req.body.intro,
//     })
//     // console.log(222)
//     product.save(function (err) {
//         if (err) {
//             res.json({ error: 1, message: err })
//             return
//         }
//         res.json({ error: 0, message: '商品添加成功' })
//     })

// })

// 管理员注册
exports.adzhuce = (req, res) => {
    res.render('adzhuce', {
        title: '管理员注册',
        aduser: req.session.adname,

    })
}

// router.get('/adzhuce', function (req, res) {
//     res.render('adzhuce', {
//         title: '管理员注册',

//         aduser: req.session.adname,
//         user: req.session.name,
//     })
// })

exports.adzhuces = (req, res) => {
    if (req.body.password != req.body['re-password']) {
        res.json({ error: 1, message: '两次密码不同' });

        return
    }
    AdModel.findOne({ adname: req.body.adname }).exec(function (err, data) {
        if (err) {
            res.json({ error: 1, message: err });
            return
        }
        if (data) {
            res.json({ error: 1, message: '该账号已被注册,请重新注册' })

            return
        }
        AdModel.find().count(function (err, count) {
            if (err) {
                res.json({ error: 1, message: err });
                return
            }
            if (count >= 3) {
                res.json({ error: 1, message: '数量已超限制' });

                return
            }
            var md5 = crypto.createHash('md5');
            // 通过算法，将密码进行加密
            var password = md5.update(req.body.password).digest('hex');

            var admin = new AdModel({
                adname: req.body.adname,
                password: password,
                time: new Date()
            })
            admin.save(function (err) {
                if (err) {
                    res.json({ error: 1, message: err });
                    return
                };
                res.json({ error: 0, message: '注册成功,请登录' });

            })
        })
    })
}

// router.post('/adzhuce', function (req, res) {
//     // console.log(req.body);
//     if (req.body.password != req.body['re-password']) {
//         res.json({ error: 1, message: '两次密码不同' });

//         return
//     }
//     AdModel.findOne({ adname: req.body.adname }).exec(function (err, data) {
//         if (err) {
//             res.json({ error: 1, message: err });
//             return
//         }
//         if (data) {
//             res.json({ error: 1, message: '该账号已被注册,请重新注册' })

//             return
//         }
//         AdModel.find().count(function (err, count) {
//             if (err) {
//                 res.json({ error: 1, message: err });
//                 return
//             }
//             if (count >= 3) {
//                 res.json({ error: 1, message: '数量已超限制' });

//                 return
//             }
//             var md5 = crypto.createHash('md5');
//             // 通过算法，将密码进行加密
//             var password = md5.update(req.body.password).digest('hex');

//             var admin = new AdModel({
//                 adname: req.body.adname,
//                 password: password,
//                 time: new Date()
//             })
//             admin.save(function (err) {
//                 if (err) {
//                     res.json({ error: 1, message: err });
//                     return
//                 };
//                 res.json({ error: 0, message: '注册成功,请登录' });

//             })
//         })
//     })
// })

// // 管理员登录
// router.get('/adlogin', function (req, res) {
//     console.log(1)
//     res.render('adlogin', {
//         title: '管理员登录',

//     })
//     console.log(2)
// })


// module.exports = router;


exports.adlogin = (req, res) => {
    res.render('adlogin', {
        title: '管理员登录',
        aduser: req.session.adname,

    })
}

exports.adlogins = (req, res) => {
    AdModel.findOne({ adname: req.body.adname }).exec(function (err, data) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        if (!data) {
            res.json({ error: 1, message: '账号不存在,请注册' })

            return
        }
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        if (password != data.password) {
            res.json({ error: 1, message: '用户名或密码错误' })

            return
        }
        req.session.adname = data;
        res.json({ error: 0, message: '登录成功' })
    })
}


exports.tuichu = (req, res) => {
    req.session.adname = null;
    res.redirect('/')
    res.end();
}

exports.del = (req, res) => {
    // console.log(req.params.name);
    var name = req.params.name;
    Film.findOneAndRemove({ '_id': name }).exec(function (err) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        res.json({ error: 0, message: '删除成功!' })
      
    })
}

exports.revise = (req, res) => {
    var id = req.params.name;


    Film.findById({ '_id': id }).exec(function (err, data) {


        if (err) {
            res.json({ error: 1, message: 'err' })
        }
        if (!data) {
            return res.json({ error: 1, message: '文件不存在!' })
        }
        res.render('updated', {
            title: '编辑页面',
            aduser: req.session.adname,

            data: data
        })
    })


}

exports.revises = (req, res) => {
    var id = req.params.name;
    Film.findByIdAndUpdate({ '_id': id }, {
        cost: req.body.price,
        score: req.body.score,
        record: req.body.record
    }).exec(function (err, data) {
        if (err) {
            return res.json({ error: 1, message: 'err' })
        }

        return res.json({ error: 0, message: '修改成功!' });
    })


}