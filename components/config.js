module.exports.config = {

}
module.exports.portalMapping = [
    {
        name: "Gingo One",
        uploadUrl: "gingo-one-upload.mediashuttle.com",
        downloadUrl: "gingo-one-download.mediashuttle.com",
        expirationHours: 168,
        // senderEmail: "sreynolds@signiant.com",
        senderName: "Scott Reynolds",
        emailSubject: "Gingo One has new files available to download.",
        emailBody: "Click the link to initiate the download.",
        requestLinkUrl: "https://ms-metadata-distribute.herokuapp.com/request/"
    }
]