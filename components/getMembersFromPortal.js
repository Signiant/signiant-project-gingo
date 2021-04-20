require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY

module.exports = async (portalId) => {

    var apiInstance = new MediaShuttleApi.PortalsApi();

    var callback = function (error, data, response) {
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    };

    apiInstance.getMembersFromPortal(portalId, callback);
}