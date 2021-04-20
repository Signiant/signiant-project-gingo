require('dotenv').config()
const axios = require('axios');
const config = require('./config');
const getPortals = require('./getPortals');
const portalsPortalIdPackagesPost = require('./portalsPortalIdPackagesPost');
const putPackages = require('./putPackages')

module.exports = async (params) => {
   
   let { portalId, portalUrl, packageId, userEmail, grants, expiration, destinationPath, files, webhook } = params;
   
   if (!portalId && !portalUrl) {
      console.log('error: portalId or portalUrl is required')
      return ({error: 'portalId or portalUrl is required'})
   }
   
   if (!userEmail) {
      console.log('error: user email required')
      return ({error: 'user email required'})
   }
   
   if (grants === 'upload' && !files) {
      return ({error: 'file list and destinationPath required for upload grants'})
   }
   
   if (!expiration) {
      console.log('error: expiration required')
      return ({error: 'expiration required'})
   }
   
   if (!portalId) {
      try {
         portalDetails = await getPortals(portalUrl)
         portalId = portalDetails[0].id
      } catch (error) {
         return ({ error })
      }
   }
   
   const generatePackageId = async () => {
      if (packageId) {
         return packageId
      } else {
         try {
            packageIdDetails = await portalsPortalIdPackagesPost(portalId)
            if (grants[0] === "download") {
               try {
                  await putPackages(portalId, packageIdDetails, files)
               } catch (error) {
                  return {error }
               }
               
            }
            return packageIdDetails
         } catch (error) {
            return ({ error })
         }
      }
   }
   const refPackageId = await generatePackageId()
   
   let params = {
      method: 'POST',
      baseURL: config.apiUrl + '/portals/',
      url: portalId + '/packages/' + refPackageId + '/tokens',
      data: {
         user: { email: userEmail },
         expiresOn: expiration,
         grants
      }
   }

   if (grants === ['upload']) {
      options.destinationPath = destinationPath
   }

   if (webhook) {
      options.data.notifications =
         [
            {
               type: 'webhook',
               url: webhook
            }
         ]
   }

   try {
      let result
      async (params) => {
         params.headers = { Authorization: config.MS_API_KEY }
         result = await axios(params)
         console.log('genWebToken result:', result)
      }
      return result.data.url
   } catch (error) {
      return {error: error}
   }


}
