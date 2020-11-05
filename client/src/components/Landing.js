import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

let sectionStyle = {
	width: "100%",
	height: "400px",
	backgroundImage: "url(" + "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpapertip.com%2Fwpic%2FwwiRox_software-engineer%2F&psig=AOvVaw3SF8duJZ0FVBdeg_ct8G4s&ust=1604608705832000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDMlLnf6ewCFQAAAAAdAAAAABAD" + ")",
	backgroundPosition: 'center',
  	backgroundSize: 'cover',
  	backgroundRepeat: 'no-repeat'
}

const Landing = ({ auth }) => {
	return (
		<div className="background">
			
			<Container>
				<Row>
					<Col/>
					<Col md="6">
						<div className="welcome-box">
							<h3 className="emaily-text" style={{ margin: '20px', fontWeight: '700' }}>
								ESurvey
							</h3>
							<p>
								Easily send surveys to your customers to gain an accurate representation of
								their thoughts.
							</p>
							<a href="/auth/google" className="btn btn-danger">
								{auth ? 'Get Started' : 'Login With Google'}
							</a>
						</div>
					</Col>
					<Col/>
				</Row>
			</Container>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Landing);