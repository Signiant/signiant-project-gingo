const { sendmail } = require('../../../components/sendMail')
const { ms } = require('@concentricity/media_shuttle_components')


module.exports.webhookParser = async (req, res) => {
    let {payload} = req.body
    console.log('payload: ', payload)

    const emails = await ms.getPortalsUsers(payload.portalDetails.id)

    await sendmail(emails, 'From Me', 'Test subject', 'Test message body')
    return res.status(200).json(payload)
}