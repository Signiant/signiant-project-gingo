const config = require('../../../config');
const rp = require('request-promise');
const ejs = require('ejs');
const { generateSignedUrl } = require('../../../components/generateSignedUrl')


module.exports.showController = async (req, res) => {

    /* 
    1. Extract Media Shuttle package endpoint url from the redirectUrl request body parameter passed by Media Shuttle
    2. Invoke a GET request on this url to retrieve all known package details prior displaying the metadata form.
    3. The package endpoint url is the same as the redirectUrl without the /metadata suffix.
    */

    const portalPackageUrl = new URL(req.body.redirectUrl);
    console.log('portalPacakgeUrl', portalPackageUrl)
    const portalDomain = portalPackageUrl.hostname
    const formUrl = portalDomain + '/show';
    const portalMapping = config.portalMapping

    console.log('showController:', portalPackageUrl, formUrl, portalPackageUrl)
    // lookup portal mapping to determine portal app settings
    const mapping = portalMapping.find(item => {
        if (portalPackageUrl === item.uploadUrl) {
            return item
        }
    })

    // Generate a signed url for the above using the portal registration key.
    const signedPortalPackageUrl = generateSignedUrl(portalPackageUrl, '', mapping.registrationKey);

    setTimeout(() => {
        rp.get(signedPortalPackageUrl)
            .then(portalPackage => {
                let portalPackageJson = JSON.parse(portalPackage);
                return rp.get(formUrl)
                    .then(form => {
                        res.send(ejs.render(form, {
                            redirectUrl: req.body.redirectUrl,
                            senderEmail: portalPackageJson.packageDetails.sender
                        }));
                    });
            })
            .catch(err => {
                return res.status(500).send(err.message).end();
            });
    }, 500)
}
