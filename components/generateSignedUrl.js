const querystring = require('querystring');
const crypto = require('crypto');

exports.generateSignedUrl = (requestUrl, requestBody, registrationKey) => {
    console.log("Generate Signed Url requestUrl:",requestUrl )
    console.log("Generate Signed Url requestBody:",requestBody )
    console.log("Generate Signed Url registrationKey:",registrationKey )
    const requestTimestamp = new Date().toISOString();

    // Generate canonical query string
    const algorithmParam = 'X-Sig-Algorithm=SIG1-HMAC-SHA256';
    const dateParam = `X-Sig-Date=${requestTimestamp}`;
    const canonicalQueryString = `${querystring.escape(algorithmParam)}&${querystring.escape(dateParam)}`;
    console.log('generateSignedUrl1')
    // // Generate the string to sign
    // const requestBodyHash = crypto.createHash('sha256').update(requestBody).digest('hex');
    // const stringToSign = `${requestTimestamp}\n${requestUrl}\n${canonicalQueryString}\n${requestBodyHash}`;
    // console.log('generateSignedUrl2')
    // // Generate the signing key
    // let hmac = crypto.createHmac('sha256', registrationKey);
    // const signingKey = hmac.update(requestTimestamp).digest();
    // console.log('generateSignedUrl3')
    // // Generate request signature
    // hmac = crypto.createHmac('sha256', signingKey);
    // const signature = hmac.update(stringToSign).digest('hex');
    // console.log('generateSignedUrl4')
    // // Generate the signed URL
    // const signatureParam = `X-Sig-Signature=${signature}`;
    // return `${requestUrl}?${algorithmParam}&${dateParam}&${signatureParam}`;
};