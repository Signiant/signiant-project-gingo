const config = require('./config');
const querystring = require('querystring');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')
const registrationKey = config.keys.registrationKey;

module.exports.processController = (req, res) => {
    const form = querystring.parse(req.body);
    const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
    res.set('Location', signedUrl);
    return res.status(307).end();
}