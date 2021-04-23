module.exports.api = {
    apiUrl: 'https://api.mediashuttle.com/v1'
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
        requestLinkUrl: "https://ms-metadata-distribute-staging.herokuapp.com/request/"
    },
    {
        name: "APEX",
        uploadUrl: "apex-upload.mediashuttle.com",
        downloadUrl: "apex-download.mediashuttle.com",
        expirationHours: 168,
        senderEmail: "sreynolds@signiant.com",
        senderName: "APEX Admin",
        emailSubject: "APEX has new package available to download",
        emailBody: "Click below to download the package:",
        requestLinkUrl: "https://ms-metadata-distribute.herokuapp.com/request/"
    }
]