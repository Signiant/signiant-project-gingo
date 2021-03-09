/*
Module workflow:
    1. Receive webhook from mediashuttle.com when file upload completes
    2. Determines associated download portal and retrieves member emails
    3. Generates an upload link that will hit the POST /request endpoint
    4. Sends email to receipients with the link
*/

const { sendMail } = require('../../../components/sendMail')
const { portalMapping } = require('../../../components/config')
const { getPortals, getPortalsUsers, getPortalsPackages } = require('@concentricity/media_shuttle_components')

module.exports.webhookController = async (req, res) => {

    
    // retrieve webhook payload details
    const { payload } = req.body
    
    // lookup portal mapping to determine download portal
    const mapping = portalMapping.find(item => {
        return payload.portalDetails.url === item.uploadUrl
    })
    
    console.log(`Uploaded completed for: ${mapping.name}'`)

    // retrieve destination portal details
    const getPortalId = async (downloadPortal) => {
        try {
            let portalDetails = await getPortals(downloadPortal)
            return portalDetails.data[0].id
        } catch (error) {
            return error
        }
    }

    const downloadPortalId = await getPortalId(mapping.downloadUrl)

    // retrieve destination portal emails
    const getDestinationEmails = async (portalId) => {
        try {
            let emailArray = await getPortalsUsers(downloadPortalId)
            let emailsOnly = []
            emailArray.data.map(item => {
                emailsOnly.push(item.email)
            })
            return emailsOnly
        } catch (error) {
            return error
        }
    }
    const destinationEmails = await getDestinationEmails(downloadPortalId)

    // retrieve package metadata
    const packageData = await getPortalsPackages(payload.portalDetails.id, payload.packageDetails.id)

    // standardize order of metadata keys
    let metadataFormatted = {
        'Sender name': packageData.data.metadata.senderName,
        'Sender email': packageData.data.metadata.senderEmail,
        'Show/Feature name': packageData.data.metadata.showFeatureName,
        'Package contents': packageData.data.metadata.packageContents
    }

    // convert JSON to string format
    let metadataToString = ''
    for (const [key, value] of Object.entries(metadataFormatted)) {
        metadataToString += (`${key}: ${value}\n`);
    }

    // send email to recipients
    let emailBody =
        'Package metadata:\n\n' +
        metadataToString + '\n\n' +
        mapping.emailBody + '\n' +
        mapping.requestLinkUrl + payload.portalDetails.id + '.' + payload.packageDetails.id

    const sendEmail = async () => {
        let emailData = {
            to: destinationEmails,
            from: mapping.senderEmail,
            subject: mapping.emailSubject,
            emailBody
        }
        try {
            return await sendMail(emailData)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    const sendMailResult = await sendEmail()
    return res.status(200).json(sendMailResult)
}