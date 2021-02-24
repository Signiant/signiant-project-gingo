const querystring = require('querystring');
const {generateSignedUrl} = require('../../../components/generateSignedUrl')
const registrationKey = process.env.registrationKey;

module.exports.processController = (req, res) => {
    // a slight delay is required while the package data is stored from the metadata submit. Package data is also available in portalPackage above but demonstrates subsequent retrievals via the API
    setTimeout(()=>{}, 1000)
    // console.log('req.body:', req.body)
    const form = querystring.parse(req.body);
    // console.log('form:',(typeof form))
    // console.log('form.redirectUrl:', form.redirectUrl)
    const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
    // console.log('signedUrl:', signedUrl)
    res.set('Location', signedUrl);
    // console.log('res.set')
    return res.status(307).end();
}