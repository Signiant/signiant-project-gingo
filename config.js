require('dotenv').config()

module.exports.settings = {
    apiUrl: "https://api.mediashuttle.com/v1",
    AWS_REGION: "us-west-2"
}

module.exports.keys = {
    MS_API_KEY: process.env.MS_API_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
}

module.exports.portalMapping = [
    {
        name: "Junmai Dalet",
        uploadUrl: "dalet-signiant-wv.mediashuttle.com",
        applicationHost: "https://uighzt2fyg.execute-api.us-west-2.amazonaws.com/dev",
        registrationKey: "1fe3b8db-e3a3-498f-a6df-a73593c95dc5",
        s3uploadBucketName: "signiant-solutions-dalet",
        objectNamePrefix: "metadata",
        contentTypes: ['json']
    }
]
