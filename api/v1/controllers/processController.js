const config = require('./config');
const querystring = require('querystring');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')




module.exports.processController = (req, res) => {
    
    // lookup portal mapping to determine portal app settings
    const portalPackageUrl = req.body.redirectUrl.replace(/\/metadata$/, '');
    console.log('processController', portalPackageUrl)
    const portalMapping = config.portalMapping
    const mapping = portalMapping.find(item => {
        if (portalPackageUrl === item.uploadUrl) {
        return item
    }
    
    const registrationKey = mapping.registrationKey;

    const form = querystring.parse(req.body);
    const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
    res.set('Location', signedUrl);
    return res.status(307).end();
}