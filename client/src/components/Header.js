import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return ;
            case false:
                return (<li><a href="/auth/google" style={{ fontSize: '20px', color: 'white'}}> Login with Google</a></li>)
            default:
                return [
                <li key="1"> <Payments /> </li>,
                <li key="3" style={{ margin: '0 20px', fontSize: '20px', color: 'white'}}> Credits: {this.props.auth.credits}</li>,
                <li key="2"><a href="api/logout" style={{ fontSize: '20px', color: 'black'}}>Logout</a></li>
                
            ];
        }
    }
    render() {
        return (
            <nav className="red darken-1">
                <div className="nav-wrapper red lighten-2">
                    
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="nav-brand"
                    style={{ fontSize: '35px', fontFamily: 'cursive', color: 'black', margin: '0 30px'}}
                    > 
                        Esurvey
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header) 