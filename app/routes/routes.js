var express = require('express');
var router = express.Router();
const parseController = require('../controllers/parse-controller');

router.post('/parse', parseController.extractUrlMetaData);

module.exports = router;