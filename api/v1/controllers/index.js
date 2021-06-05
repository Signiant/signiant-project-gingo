const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {sendForm} = require('../../../components/sendForm')
const {showController} = require('./showController')
const {processController} = require('./processController')
const uploadObjectToS3 = require('../../../components/uploadObjectToS3')
const webhookController = require('./webhookController')
// const {requestController} = require('./requestController')

router.get('/form', sendForm)
router.post('/show', express.urlencoded({extended: true}), showController)
router.post('/process', express.json(), processController)
//router.post('/upload', uploadObjectToS3)
router.post('/webhook/upload', webhookController)
// router.get('/request/:key', requestController)
module.exports = router;