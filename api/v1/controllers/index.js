const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const textParser = bodyParser.text({ type: '*/*' });
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const {sendForm} = require('../../../components/sendForm')
const {showController} = require('./showController')
const {processController} = require('./processController')

router.get('/form', sendForm)
router.get('/show', urlencodedParser, showController)
router.post('/process', textParser, processController)

module.exports = router;