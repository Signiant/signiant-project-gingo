const rp = require('request-promise');
const ejs = require('ejs');
const registrationKey = process.env.registrationKey;
const {generateSignedUrl} = require('../../../components/generateSignedUrl')
const {sendForm} = require('../../../components/sendForm')

module.exports.showController = (req, res) => {
    let portalId, packageId;
    // Extract Media Shuttle package endpoint url from the redirectUrl request body parameter passed by Media Shuttle
    // You can invoke a GET request on this url to retrieve all known package details prior displaying the metadata form.
    // The package endpoint url is the same as the redirectUrl without the /metadata suffix.
    const portalPackageUrl = req.body.redirectUrl.replace(/\/metadata$/, '');

    // Generate a signed url for the above using the portal registration key.
    const signedPortalPackageUrl = generateSignedUrl(portalPackageUrl, '', registrationKey);

    // Fetch the package details from Media Shuttle and use them to fill in template values in the web form.
    rp.get(signedPortalPackageUrl)
        .then(portalPackage => {
            const portalPackageJson = JSON.parse(portalPackage);
            portalId = portalPackageJson.packageDetails.portalId;
            packageId = portalPackageJson.packageDetails.packageId;
            sender = portalPackageJson.packageDetails.sender;
            return rp.get(sendForm)
                .then(form => {
                    res.send(ejs.render(form, {
                        packageId: portalPackageJson.packageDetails.packageId,
                        files: portalPackageJson.packageDetails.files,
                        redirectUrl: req.body.redirectUrl,
                        sender: portalPackageJson.packageDetails.sender
                    }));
                });
        })
        .catch(err => {
            res.status(500).send(err.message).end();
        });
}
