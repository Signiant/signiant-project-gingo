/*
Module workflow:
    1. Receive GET /requestDownload/:packageId
    2. Generates S2P download token link
    3. Redirects to link at *.mediashuttle.com
*/
// const { generateWebToken } = require('@concentricity/media_shuttle_components')
const { generateWebToken } = require('../../../../ms-components/index')

module.exports.request = async (req, res) => {

    // retrieve request packageId
    const { packageId } = req.params
    
    // retrieve destination portal details
    const params = {
        portalId,
        portalUrl,
        packageId,
        userEmail,
        grants,
        expiration,
        destinationPath,
        files,
        webhook
    }
    const retrieveToken = async () => {
        try {
            let webtoken = await generateWebToken(destinationPortal)
            return portalDetails.data[0].id
        } catch (error) {
            return error
        }
    }

    const portalId = await getPortalId()

    // retrieve destination portal emails
    const getDestinationEmails = async () => {
        try {
            let emailArray = await getPortalsUsers(portalId)
            let emailsOnly = []
            emailArray.data.map(email => {
                emailsOnly.push(email.email)
            })
            return emailsOnly
        } catch (error) {
            console.log(error)
            return error
        }
    }
    const destinationEmails = await getDestinationEmails()

    // generate S2P download link for destination portal

    // generate dynamic expiration based on package details TBD
    let expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + 10000);

    let downloadLinkParams = {
        portalId,
        // portalUrl,
        packageId,
        userEmail,
        grants,
        expiration,
        destinationPath,
        files,
        webhook
    }
    let getDownloadLink = async (downloadLinkParams) => {

    }


    // // Extract email from JSON
    // let emailsOnly = []
    // emails.data.map(email => {
    //     emailsOnly.push(email.email)
    // })

    // await sendMail(emailsOnly, 'From Me', 'Test subject', 'Test message body')
    return res.status(200).json(payload)
}