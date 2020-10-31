//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'


class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
            <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
            )
        })
        // return (
        //     <div>
        //         <Field label="Survey Title"type="text" name="title" component={SurveyField} />
        //         <Field label="Survey Line"type="text" name="subject" component={SurveyField} />
        //         <Field label="Email body"type="text" name="body" component={SurveyField} />
        //         <Field label="Recipients List"type="text" name="emails" component={SurveyField} />
        //     </div>
        // );
    }
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> 
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text"> Cancel 
                <i className="material-icons left"> arrow_back </i>
                </Link>
                <button type="submit" className="teal btn-flat right white-text"> Next 
                <i className="material-icons right"> arrow_forward </i>
                </button>
                </form>
            </div>
        )
    }
}


function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '')
    _.each(formFields, ({ name }) => {
            if(!values[name]){
                errors[name] = 'You must provide a value'
            }
    });

    // if(!values.title) {
    //     errors.title = 'You must provide a title!'
    // }
    // if(!values.subject) {
    //     errors.subject = 'You must provide a subject'
    // }
    
    return errors;
    
}
// line 9: this.props.handleSubmit is a function from reduxForm
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false //keeps values in the form 
})(SurveyForm)

