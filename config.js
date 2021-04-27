require('dotenv').config()

module.exports.settings = {
    apiUrl: 'https://api.mediashuttle.com/v1',
    AWS_REGION=process.env.AWS_REGION
}

module.exports.keys = {
    MS_API_KEY=process.env.MS_API_KEY,
    registrationKey=process.env.registrationKey,
}

module.exports.portalMapping = [
    {
        name: "Gingo One",
        uploadUrl: "gingo-one-upload.mediashuttle.com",
        downloadUrl: "gingo-one-download.mediashuttle.com",
        expirationHours: 168,
        senderEmail: "sreynolds@signiant.com",
        senderName: "Gingo One Admin",
        emailSubject: "Gingo One has new package available to download",
        emailBody: "Click below to download the package:",
        requestLinkUrl: "https://ms-metadata-distribute.herokuapp.com/request/"
    },
    {
        name: "Gingo One Dev",
        uploadUrl: "gingo-one-upload-dev.mediashuttle.com",
        downloadUrl: "gingo-one-download-dev.mediashuttle.com",
        expirationHours: 168,
        senderEmail: "sreynolds@signiant.com",
        senderName: "Gingo One Admin",
        emailSubject: "Gingo One has new package available to download",
        emailBody: "Click below to download the package:",
        requestLinkUrl: "https://ms-metadata-distribute-dev.herokuapp.com/request/"
    }
]