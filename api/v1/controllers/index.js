const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const textParser = bodyParser.text({ type: '*/*' });
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const {sendForm} = require('../../../components/sendForm')
const {showController} = require('./showController')
const {processController} = require('./processController')
const {webhookParser} = require('./webhookParser')

router.use('/form', sendForm)
router.use('/show', urlencodedParser, showController)
router.post('/process', textParser, processController)
router.post('/webhook', bodyParser.json(), webhookParser)

module.exports = router;