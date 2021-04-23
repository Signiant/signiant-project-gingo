require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY

module.exports = (portalId, packageId, files) => {
    console.log('putPackages', portalId, packageId, files)
    return new Promise((resolve, reject) => {
        console.log(typeof files)
        var apiInstance = new MediaShuttleApi.SystemToPersonApi();
        var fileset = new MediaShuttleApi.FileSetRequest({files: files});
        
        console.log('fileset', fileset)
    
        var callback = function (error, data, response) {
            if (error) {
                reject(error);
            } else {
                console.log('data', data)
                resolve(data);
            }
        };

        apiInstance.putPackages(portalId, packageId, fileset, callback);
    })

}