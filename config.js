require('dotenv').config()

module.exports.settings = {
    apiUrl: "https://api.mediashuttle.com/v1",
    AWS_REGION: "us-west-2"
}

module.exports.keys = {
    MS_API_KEY=process.env.MS_API_KEY
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
        requestLinkUrl: "https://ms-metadata-distribute.herokuapp.com/request/",
        registrationKey="548dee83-3be1-4afa-ba54-0fc54cfa936b"
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
        requestLinkUrl: "https://ms-metadata-distribute-dev.herokuapp.com/request/",
        registrationKey="44143263-0170-4c6e-b85c-bd23d422bf7f"
    }
]