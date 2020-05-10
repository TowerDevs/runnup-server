const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
const clientEmail = process.env.CLIENT_EMAIL;

module.exports = (req, res) => {
    const { email, subject, text } = req.body;
    sgMail.setApiKey(apiKey);

    const options = {
        to: clientEmail,
        from: email,
        subject,
        html: `<!DOCTYPE HTML>
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                ${text}
            </body>
        </html>`
    };

    sgMail.send(options);

    return res.status(201).json({ message: "Message sent" });
};