require('dotenv').config()
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: process.env.REGION });


const setEmailParams = (emailParams) => {
    
    let {to, from, subject, emailBody} = emailParams
    
    // Check for less than 50 or less support recipients
    if (to.length >= 50) {
        console.log('More than 50 recipients is not allowed.')
        return { error: 'More than 50 recipients is not allowed.'}
    }
    // Set the parameters
    const params = {
        Destination: {
            BccAddresses: [
                to
            ]
        },
        Message: {
            /* required */
            Body: {
                /* required */
                // Html: {
                //     Charset: "UTF-8",
                //     Data: "HTML_FORMAT_BODY",
                // },
                Text: {
                    Charset: "UTF-8",
                    Data: emailBody
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: from,
        ReplyToAddresses: [
            /* more items */
        ],
    };
    return params
}

module.exports.sendMail = async (to, downloadLink) => {

    let params = setEmailParams(to, downloadLink)
    
    try {
        const data = await ses.send(new SendEmailCommand(params));
        console.log("Success", data);
        return { message: 'success'}
    } catch (err) {
        console.log("Error", error);
        return { error }
    }
}