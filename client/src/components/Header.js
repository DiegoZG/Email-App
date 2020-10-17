import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="wrapper">
                    <a className="left-brand-logo">
                        Esurvey
                    </a>
                    <ul className="right">
                        <li>
                            <a> Login With Google </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header 