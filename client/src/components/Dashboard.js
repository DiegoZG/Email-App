import React from 'react'
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList'
import { connect } from 'react-redux'

const Dashboard = ({surveys}) => {
    return (
        
            <div>
                
                <div className="container" style={{ marginBottom: '100px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Dashboard</h2>
                    {surveys.length === 0 ? (
                        <div className="dashboard-text">
                            <p className="flow-text">
                                There are no surveys to display. To create a new survey, please click the red '+' button at
                                the bottom of the page.
                            </p>
                            <p className="flow-text">
                                You need at least one credit to send off a set of surveys, so before proceeding please purchase some credits 
                                for $5.00 by using the blue 'Add Credits' button in the pages' header.
                            </p>
                        </div>
                    ) : (
                        <div className="dashboard-text">
                            <p className="flow-text">
                                Here are your current survey responses. Responses can take a minute or so for the
                                percentage to update after responses, so please be patient while this loads.
                            </p>
                            <p className="flow-text">To create a new survey, please click the red '+' button at the bottom right of the page</p>
                        </div>
                    )}
                    <SurveyList />
                    <div className="fixed-action-btn">
                        <Link to="/surveys/new" className="fixed-add-btn">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

const mapStateToProps = ( { surveys } ) => {
    return {
        surveys
    } 
}
export default connect(mapStateToProps)(Dashboard);