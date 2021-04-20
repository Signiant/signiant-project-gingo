require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY

 = async (portalId, packageId) => {
    
    var apiInstance = new MediaShuttleApi.SystemToPersonApi();
    
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        return data;
      }
    };

    apiInstance.portalsPortalIdPackagesPackageIdFilesGet(portalId, packageId, callback);
}