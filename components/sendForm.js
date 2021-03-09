const path = require('path');

module.exports.sendForm = (req, res) => {
    console.log('SendForm req.body', req.body)
    return res.sendFile(path.join(__dirname, "../public/form.html"));
}