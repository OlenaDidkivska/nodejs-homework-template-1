const sendGrid = require('@sendgrid/mail')
const {SENDGRID_API_KEY, EMAIL_USER} = process.env;

const sendMail = async (req, res, next) => {
    sendGrid.setApiKey(SENDGRID_API_KEY);

    const email = {
        from: EMAIL_USER,
        to: 'elenatyutyuma@gmail.com',
        subject: "SendGrid Test",
        html: "<h1>Hello</h1>",
        text: "Hello"
    }

    await sendGrid.send(email)
    return res.json({ ok : true})
}

module.exports = {sendMail}