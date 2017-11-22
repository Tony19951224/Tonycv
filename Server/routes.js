const express = require('express');
const router = express.Router();
const home = require('./routes/home')
var index = require('./routes/index');
var users = require('./routes/users');


// server
router.get('/', index.home);

router.get('/update', users.update);
router.post('/update', users.updates);

router.get('/adzhuce', users.adzhuce);
router.post('/adzhuce', users.adzhuces);

router.get('/adlogin', users.adlogin);
router.post('/adlogin', users.adlogins);

router.get('/tuichu', users.tuichu);

router.get('/del/:name', users.del);

router.get('/revise/:name', users.revise);
router.post('/revise/:name', users.revises);

// client
router.get('/session', home.session);
router.get('/logout', home.logout);
router.post('/register', home.register);
router.post('/login', home.login);
router.get('/show', home.show);
router.post('/detailed', home.detailed);
router.post('/record', home.record);
router.post('/score', home.score);
router.post('/buy', home.buy);
router.post('/car', home.car);
// zsgc
router.post('/minus', home.minus);
router.post('/add', home.add);
router.post('/del', home.del);
router.post('/dot', home.dot);
router.post('/pay', home.pay);
router.post('/comment', home.comment);
router.post('/pinglun', home.pinglun);
router.post('/revise', home.revise);
router.post('/xianshi', home.xianshi);
router.post('/search', home.search);
router.post('/remove', home.remove);
router.post('/clears', home.clears);
module.exports = router;