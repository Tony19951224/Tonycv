var express = require('express');
var router = express.Router();
var Film = require('../model/Film');

exports.home = (req, res) => {
  Film.find().exec(function (err, film) {
    if (err) {
      return res.end(err);
    }
    res.render('index', {
      title: '主页',
      film: film,
      aduser: req.session.adname,
    })
  })
}
