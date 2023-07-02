import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeFooter.scss'
import { FormattedMessage } from 'react-intl'
import HomerFooter from '../../assets/Footer/banner1.jpg'

class HomeFooter extends Component {

    render() {

        return (
            <div className='section-home-footer'>
                <div className='home-footer-container'>
                    <div><img src={HomerFooter}></img></div>
                   <p>&copy; 2023 Hana - ThuyTran <a target='blank' href='#'>More information</a></p>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
