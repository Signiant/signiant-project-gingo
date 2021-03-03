/*
Module workflow:
    1. Receive webhook from mediashuttle.com when file upload completes
    2. Determines associated download portal and retrieves member emails
    3. Generates an upload link that will hit the POST /request endpoint
    4. Sends email to receipients with the link
*/

const { sendMail } = require('../../../components/sendMail')
const { portalMapping } = require('../../../components/config')
const { getPortals, getPortalsUsers } = require('@concentricity/media_shuttle_components')
// const { getPortals, getPortalsUsers } = require('../../../../ms-components/index')

module.exports.webhookUpload = async (req, res) => {

    // retrieve webhook payload details
    const { payload } = req.body
    // console.log('payload', payload)

    // lookup portal mapping to determine download portal
    const mapping = portalMapping.find(item => {
        return payload.portalDetails.url === item.uploadUrl
    })

    // retrieve destination portal details
    const getPortalId = async (downloadPortal) => {
        try {
            let portalDetails = await getPortals(downloadPortal)
            return portalDetails.data[0].id
        } catch (error) {
            return error
        }
    }

    const portalId = await getPortalId(mapping.downloadUrl)

    // retrieve destination portal emails
    const getDestinationEmails = async (portalId) => {
        try {
            let emailArray = await getPortalsUsers(portalId)
            let emailsOnly = []
            emailArray.data.map(item => {
                emailsOnly.push(item.email)
            })
            return emailsOnly
        } catch (error) {
            return error
        }
    }
    const destinationEmails = await getDestinationEmails(portalId)

    // send email to recipients
    const sendEmail = async () => {
        let emailData = {
            to: destinationEmails,
            from: mapping.senderEmail,
            subject: mapping.emailSubject,
            emailBody: mapping.emailBody + 
                '\n\n' + mapping.requestLinkUrl + payload.packageDetails.id 
            // emailBody: "Hello"
        }
    
        try {
            return await sendMail(emailData)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
    const sendMailresult = sendEmail()
    return res.status(200).json(sendMailresult)
}