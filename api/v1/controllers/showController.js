const rp = require('request-promise');
const axios = require('axios');
const ejs = require('ejs');
const registrationKey = process.env.registrationKey;
const {generateSignedUrl} = require('../../../components/generateSignedUrl')
const formUrl = process.env.formUrl;

module.exports.showController = async (req, res) => {

    /* 
    1. Extract Media Shuttle package endpoint url from the redirectUrl request body parameter passed by Media Shuttle
    2. Invoke a GET request on this url to retrieve all known package details prior displaying the metadata form.
    3. The package endpoint url is the same as the redirectUrl without the /metadata suffix.
    */

    const portalPackageUrl = req.body.redirectUrl.replace(/\/metadata$/, '');

    // Generate a signed url for the above using the portal registration key.
    const signedPortalPackageUrl = generateSignedUrl(portalPackageUrl, '', registrationKey);

    // Restore this refactoring to include timeout after more testing

    // Fetch the package details from Media Shuttle
    let portalPackageJson
    try {
        console.log('here2')
        let params1 = {
            method: 'GET',
            params: { BaseURL: signedPortalPackageUrl }
        }

        setTimeout( async () => {
            const portalPackage = await axios(params1)
        }, 500)
        console.log('portalPackage', portalPackage)
        const portalPackageJson = JSON.parse(portalPackage)
        console.log('portalPackageJson', portalPackageJson)
    } catch (error) {
        return res.status(500).send(error.message).end();
    }

    // Return the form with the template values
    console.log('portalPackageJson', portalPackageJson)
    try {
        let params2 = {
            method: 'GET',
            params: { baseURL: formUrl }
        }
    
        const form = await axios(params2)
        console.log('form', form)
    
        res.send(ejs.render(form, {
            redirectUrl: req.body.redirectUrl,
            senderEmail: portalPackageJson.packageDetails.sender
        }));
    } catch (error) {
        return res.status(500).send(error.message).end();
    }
    

    // setTimeout( () => {
    //     rp.get(signedPortalPackageUrl)
    //         .then(portalPackage => {
    //             let portalPackageJson = JSON.parse(portalPackage);
    //             return rp.get(formUrl)
    //                 .then(form => {
    //                     res.send(ejs.render(form, {
    //                         redirectUrl: req.body.redirectUrl,
    //                         senderEmail: portalPackageJson.packageDetails.sender
    //                     }));
    //                 });
    //         })
    //         .catch(err => {
    //             return res.status(500).send(err.message).end();
    //         });
    // }, 500)
}
