/*
Module workflow:
    1. Receive GET /request/request/:key
        key = portalId.packageId
    2. Generates S2P download token link
    3. Redirects to link at *.mediashuttle.com
*/
const { portalMapping } = require('../../../components/config')
const { getPortals, getPortalsPackages, getPortalsPackagesFiles, generateWebToken } = require('@concentricity/media_shuttle_components')

module.exports.requestController = async (req, res) => {

    // extract the keys from formatted email request format: /request/:key (portalId.packageId)
    const portalId = req.params.key.substring(0, 36)
    const packageId = req.params.key.substring(37, 59)

    // find and retreive upload portal details
    const accountsPortals = await getPortals()
    const uploadPortal = accountsPortals.data.find(item => {
        return portalId === item.id
    })
    const uploadPortalUrl = uploadPortal.url

    // retrieve package details including metadata
    const uploadPackageDetails = await getPortalsPackages(portalId, packageId)

    // determine download portal to use for token generation
    const mapping = portalMapping.find(item => {
        return uploadPortalUrl === item.uploadUrl
    })
    const downloadPortalUrl = mapping.downloadUrl

    // retrieve package files array
    const uploadPackageFiles = await getPortalsPackagesFiles(portalId, packageId)

    /*
    Convert file paths to storage paths.
    Uploaded files include the original local disk path. Download paths are in the format senderEmail/packageId/file-folderName
    */
    const rootPath = uploadPackageDetails.data.metadata.senderEmail + '/' + uploadPackageDetails.data.id + '/'

    let downloadPackageFiles = []

    uploadPackageFiles.data.map(item => {
        let n = item.path.split("/");
        downloadPackageFiles.push({
            path: rootPath + n[n.length - 1],
            isDirectory: item.isDirectory,
            size: item.size
        })
    })

    // determine upload portals expiration criteria
    // requires more work to calculate dynamic expiration based on config file
    let expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + 10000);

    // retrieve download token
    let params = {
        portalUrl: downloadPortalUrl,
        userEmail: 'sreynolds@signiant.com',
        grants: ["download"],
        expiration,
        files: downloadPackageFiles
    }

    try {
        const downloadToken = await generateWebToken(params)
        res.status(200).redirect(downloadToken.data)
    } catch (error) {
        res.status(400).JSON(error)
    }

}