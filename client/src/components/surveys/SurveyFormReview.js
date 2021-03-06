//shows users their orm inputs for review
import React from 'react'
import { connect } from 'react-redux';
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{ label }</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );

    })

    return(
        <div>
            <h5> Please confirm your entries</h5>
            {reviewFields}
            <button className="red btn-flat white-text"
            onClick={onCancel}
            >
                Back
            </button>
            <button
            onClick={() => submitSurvey(formValues, history)} 
            className="teal btn-flat right white-text">
                Send Survey
                <i className="material-icons right"> email </i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values}; // -> this is being passed as props for this component! Redux <3
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));