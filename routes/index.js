'use strict';

const express = require('express');
const router = express.Router();

router.get('/', require('./welcome'));
router.get('/auth',require('./auth'));
router.get('/login', require('./login'));
router.get('/user', require('./user'));
router.get('/onedairy',require('./onedairy'));
router.post('/dairy',require('./dairy'));
router.get('/dairylist',require('./dairylist'));
router.get('/image',require('./image'));
router.get('/mydairy',require('./mydairy'));
router.post('/mergedata',require('./mergedata'));
router.get('/like',require('./like'));
router.get('/collection',require('./collection'));
router.get('/haslike',require('./haslike'));
router.get('/hascollected',require('./hascollected'));
router.all('/tunnel', require('./tunnel'));

module.exports = router;