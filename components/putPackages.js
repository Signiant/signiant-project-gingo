require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY

module.exports = (portalId, packageId, files) => {
    console.log('putPackages', portalId, packageId, files)
    files = [
        {
          "path": "scott@scottreynolds.net/YQhkXFPeNuUgd8Ei6EtLOE/blurry-lights.jpg",
          "isDirectory": false,
          "size": 902538
        },
        {
          "path": "scott@scottreynolds.net/YQhkXFPeNuUgd8Ei6EtLOE/barcode-font.jpg",
          "isDirectory": false,
          "size": 2229417
        },
        {
          "path": "scott@scottreynolds.net/YQhkXFPeNuUgd8Ei6EtLOE/backdrops",
          "isDirectory": true,
          "size": 5227442
        }
      ]
    return new Promise((resolve, reject) => {
        console.log('typeof files', typeof files)
        var apiInstance = new MediaShuttleApi.SystemToPersonApi();
        var fileset = new MediaShuttleApi.FileSetRequest(files);
        
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