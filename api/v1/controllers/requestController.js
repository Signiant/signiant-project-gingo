/*
Module workflow:
    1. Receive GET /request/request/:key
        key = portalId.packageId
    2. Generates S2P download token link
    3. Redirects to link at *.mediashuttle.com
*/
const { portalMapping } = require('../../../components/config')
const { getPortals, getPortalsPackages, getPortalsPackagesFiles, generateWebToken } = require('@concentricity/media_shuttle_components')
//const { getPortals, getPortalsPackages, getPortalsPackagesFiles, generateWebToken } = require('../../../../ms-components/index')


module.exports.requestController = async (req, res) => {
    console.log(`req.parms: ${JSON.stringify(req.params)}`)
    const portalId = req.params.key.substring(0, 36)
    console.log(`portalId: ${portalId}`)
    const packageId = req.params.key.substring(37, 59)
    console.log(`packageId: ${packageId}`)

    // find and retreive upload portal details
    const accountsPortals = await getPortals()
    console.log('accountsPortals', accountsPortals)
    const uploadPortal = accountsPortals.data.find( item => {
        return portalId === item.id
    })
    console.log('uploadPortal', uploadPortal)
    const uploadPortalUrl = uploadPortal.url
    console.log('uploadPortalUrl', uploadPortalUrl)

    // retrieve package details
    const uploadPackageDetails = await getPortalsPackages(portalId, packageId)
    console.log('uploadPackageDetails', uploadPackageDetails)
    
    // determine download portal to use for token generation

    const mapping = portalMapping.find(item => {
        return uploadPortalUrl === item.uploadUrl
    })

    const downloadPortalUrl = mapping.downloadUrl
    console.log('downloadPortalUrl', downloadPortalUrl)

    // retrieve package files
    const uploadPackageFiles = await getPortalsPackagesFiles(portalId, packageId)
    console.log('uploadPackageFiles', uploadPackageFiles)

    // generate S2P linkc

    // determine upload portals expiration criteria
    let expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + 10000);

    // get token
    let params = {
        portalUrl: downloadPortalUrl,
        userEmail: 'sreynolds@signiant.com',
        grants: ["download"],
        expiration,
        files: uploadPackageFiles.data

    }
    const downloadToken = await generateWebToken(params)
    console.log('downloadToken', downloadToken).data

    res.status(200).redirect(downloadToken.data)

}