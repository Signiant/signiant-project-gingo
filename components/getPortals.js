require('dotenv').config()
var MediaShuttleApi = require('media_shuttle_api');
var defaultClient = MediaShuttleApi.ApiClient.instance;
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = process.env.MS_API_KEY

module.exports = async (url) => {

    var apiInstance = new MediaShuttleApi.PortalsApi();
    
    if (url) {
        var opts = {
            // String | Filter the response by portal access URL. The URL must include the \".mediashuttle.com\" domain suffix.
            'url': url 
        };
    }

    var callback = function (error, data, response) {
        if (error) {
            console.error(error);
        } else {
            console.log('getPortals return data:', data)
            return data
        }
    };
    apiInstance.getPortals(opts, callback);
}