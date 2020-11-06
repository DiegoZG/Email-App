const _ = require('lodash')
const { Path } = require('path-parser');
const { URL } = require('url'); // integrated module, has method to help parse urls 
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
        .select({recipients: false});
        res.send(surveys);
    });


    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send('Thanks for voting!')
    })

    app.delete('/api/surveys/delete/:id', async (req, res) => {
        try {
            const suvey = await Survey.findOneAndDelete({_id: req.params.id})
            if(!survey){
                res.status(404).send()
            }
            res.send(survey)
        } catch(e) {
            res.status(500).send()
        }
			
	});

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
         .map( ({email, url}) => {
            const pathname = new URL(url).pathname // -> gets only the pathname in the url without the domain
            const match = p.test(pathname);
            if(match){
                return { email, surveyId: match.surveyId, choice: match.choice }
            }
        })
        .compact() // --> no undefined elements
        .uniqBy('email', 'surveyId') // -> make sure to never have with a duplicate email or survey id
        .each( ({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false}
                }
            },{
                $inc: { [choice]: 1},
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        })
        .value(); //--> return value

        res.send({});
    });


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