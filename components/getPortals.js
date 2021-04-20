const MediaShuttleApi = require('media_shuttle_api');

modules.exports = async (url) => {
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
            return data
        }
    };
    apiInstance.getPortals(opts, callback);
}