const rp = require('request-promise');
const ejs = require('ejs');
const registrationKey = process.env.registrationKey;
const {generateSignedUrl} = require('../../../components/generateSignedUrl')
let formUrl = process.env.formUrl;

module.exports.showController = (req, res) => {
    /* 
    Extract Media Shuttle package endpoint url from the redirectUrl request body parameter passed by Media Shuttle
    
    Invoke a GET request on this url to retrieve all known package details prior displaying the metadata form.
    
    The package endpoint url is the same as the redirectUrl without the /metadata suffix.
    */

    const portalPackageUrl = req.body.redirectUrl.replace(/\/metadata$/, '');

    // Generate a signed url for the above using the portal registration key.
    const signedPortalPackageUrl = generateSignedUrl(portalPackageUrl, '', registrationKey);

    // Fetch the package details from Media Shuttle and use them to fill in template values in the web form.
    rp.get(signedPortalPackageUrl)
        .then(portalPackage => {
            let portalPackageJson = JSON.parse(portalPackage);
            return rp.get(formUrl)
                .then(form => {
                    res.send(ejs.render(form, {
                        // packageId: portalPackageJson.packageDetails.packageId,
                        // files: portalPackageJson.packageDetails.files,
                        'redirectUrl': req.body.redirectUrl,
                        'sender-email': portalPackageJson.packageDetails.sender
                    }));
                });
        })
        .catch(err => {
            return res.status(500).send(err.message).end();
        });
}
