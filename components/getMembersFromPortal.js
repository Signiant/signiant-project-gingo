require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY
var apiInstance = new MediaShuttleApi.PortalsApi();

module.exports = (portalId) => {
    return new Promise ((resolve, reject) => {
    
        var callback = function (error, data, response) {
            if (error) {
                reject (error);
            } else {
                resolve (data);
            }
        };
    
        apiInstance.getMembersFromPortal(portalId, callback);
    })
}