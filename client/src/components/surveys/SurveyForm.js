//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'

class SurveyForm extends Component {

    renderFields() {
        return (
            <div>
                <Field type="text" name="title" component={SurveyField} />
            </div>
        );
    }
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}> 
                {this.renderFields()}
                <button type="submit"> Submit </button>
                </form>
            </div>
        )
    }
}
// line 9: this.props.handleSubmit is a function from reduxForm
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)

