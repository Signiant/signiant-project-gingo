const querystring = require('querystring');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')
const registrationKey = process.env.registrationKey;

module.exports.processController = (req, res) => {
    // a slight delay is required while the package data is stored from the metadata submit. Package data is also available in portalPackage above but demonstrates subsequent retrievals via the API
    setTimeout(()=>{
        const form = querystring.parse(req.body);
        const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
        res.set('Location', signedUrl);
        return res.status(307).end();
    }, 1000)
}