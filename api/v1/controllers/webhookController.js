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
// const { getPortals, getPortalsUsers } = require('../../../../ms-components/index')

module.exports.webhookController = async (req, res) => {

    // retrieve webhook payload details
    const { payload } = req.body
    console.log('payload', payload)

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
    const packageMetadata = await getPortalsPackages(payload.portalDetails.id, payload.packageDetails.id)

    let metadata = ''

    for (const [key, value] of Object.entries(packageMetadata.metadata)) {
        metadata =+ key + ': ' + value + '\n';
      }

      // send email to recipients

    let emailBody = mapping.emailBody + '\n\n' +
        metadata + '\n\n' +
        mapping.requestLinkUrl + payload.portalDetails.id + '.' + payload.packageDetails.id

    const sendEmail = async () => {
        let emailData = {
            to: destinationEmails,
            from: mapping.senderEmail,
            subject: mapping.emailSubject,
            emailBody
        }

        // console.log(`email data: ${JSON.stringify(emailData)}\nPayload: ${JSON.stringify(payload)}`)
    
        try {
            console.log('sending email:', emailData)
            return await sendMail(emailData)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
    const sendMailResult = await sendEmail()
    console.log('email sent:', sendMailResult)
    return res.status(200).json(sendMailResult)
}