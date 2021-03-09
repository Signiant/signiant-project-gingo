const querystring = require('querystring');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')
const registrationKey = process.env.registrationKey;

module.exports.processController = (req, res) => {
    console.log('processController req.body', req.body)
    const form = querystring.parse(req.body);
    console.log('elements', form.redirectUrl, req.body, registrationKey)
    const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
    console.log('signedUrl', signedUrl)
    res.set('Location', signedUrl);
    return res.status(307).end();
}