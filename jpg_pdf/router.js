var express = require('express');
var router = express.Router();
const {index} = require('./pdf-example');
const app = express();

router.get('/', index);

module.exports = router;