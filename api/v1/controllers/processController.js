const config = require('../../../config');
const querystring = require('querystring');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')

module.exports.processController = (req, res) => {

    console.log('req', req)
    //console.log('JSON req.body', json)
    // lookup portal mapping to determine portal app settings
    const portalPackageUrl = unescape(body.redirectUrl.replace(/\/metadata$/, ''));
    //console.log('portalPacakgeUrl', portalPackageUrl)
break
    // lookup portal mapping to determine portal app settings
    const portalDomain = new URL(portalPackageUrl);
    const portalHost = portalDomain.host
    const portalMapping = config.portalMapping
    
    const mapping = portalMapping.find(item => {
        if (portalHost === item.uploadUrl) {
            return item
        }
    })

    const registrationKey = mapping.registrationKey;

    console.log('processController 2', portalPackageUrl, req.body, portalHost, mapping, registrationKey)

    const form = querystring.parse(req.body);
    const signedUrl = generateSignedUrl(form.redirectUrl, req.body, registrationKey);
    res.set('Location', signedUrl);
    return res.status(307).end();
}