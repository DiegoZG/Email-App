const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {

    app.get('/api/surveys/thanks', (req,res) => {
        res.send('Thanks for voting!')
    })


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // array of objects [{ email: 'email@gmail.com'}]
            _user: req.user.id,
            dateSent: Date.now()

        });

        //Place to send email
        const mailer = new Mailer(survey, surveyTemplate(survey))
        try{
            await mailer.send();
            await survey.save();
            req.user.credits--;
            const user = await req.user.save();

            res.send(user);
         } catch {
             res.status(422).send(err);
         }
        
        
    });
};