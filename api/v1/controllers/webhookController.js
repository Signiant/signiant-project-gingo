/*
Module workflow:
    1. Receive webhook from mediashuttle.com when file upload completes
    2. Determines associated download portal and retrieves member emails
    3. Generates an upload link that will hit the POST /request endpoint
    4. Sends email to receipients with the link
*/

// const { sendMail } = require('../../../components/sendMail')
const { portalMapping } = require('../../../config')
// const getPortals = require("../../../components/getPortals.js")
const getPackages = require("../../../components/getPackages.js")
const uploadObjectToS3 = require("../../../components/uploadObjectToS3");
// const getMembersFromPortal = require("../../../components/getMembersFromPortal")

module.exports = async (req, res) => {
    
    // retrieve webhook payload details
    const { payload } = req.body

    // lookup portal mapping to determine download portal
    const mapping = portalMapping.find(item => {
        if (payload.portalDetails.url === item.uploadUrl) {
            return item
        }
    })

    // retrieve package metadata
    const packageData = await getPackages(payload.portalDetails.id, payload.packageDetails.id)
    
    console.log('pacakgeData', packageData)
    // standardize order of metadata keys
    let metadataFormatted = {
        'Sender name': packageData.metadata.senderName,
        'Sender email': packageData.metadata.senderEmail,
        'Show/Feature name': packageData.metadata.showFeatureName,
        'Package contents': packageData.metadata.packageContents
    }

    // convert JSON to XML

    // Upload metadata files to S3
    let bucketName = mapping.s3uploadBucketName
    let contentType = mapping.contentTypes[0]
    let result;
    if (contentType == 'xml' || contentType == 'XML') {
        console.log('XML')
        let objectName = 'metadata.xml'
        let objectData = metadataFormatted
        let contentType = 'application/xml'
        result = await uploadObjectToS3(bucketName, objectName, objectData, contentType)
    } else if (contentType == 'json' || contentType == 'JSON') {
        console.log('JSON')
        let objectName = 'metadata.json'
        let objectData = metadataFormatted
        let contentType = 'application/json'
        result = await uploadObjectToS3(bucketName, objectName, objectData, contentType)
    }
    
    res.status(200).send(result)
}