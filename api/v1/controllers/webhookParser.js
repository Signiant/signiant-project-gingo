const { sendmail } = require('../../../components/sendForm')

module.exports.webhookParser = async (req, res) => {
    console.log('req', req)
    let {payload} = req
    console.log('payload: ', payload)
    await sendmail('scott', 'jim', 'test', 'test body')
    return res.status(200).json(payload)
}