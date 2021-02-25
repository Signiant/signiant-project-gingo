
module.exports.sendMail = (to, from, subject, body) => {
    to.map( item => {
        console.log('to item:', item)
    })
    console.log('sendmail details:', to, from, subject, body)
    return 
}