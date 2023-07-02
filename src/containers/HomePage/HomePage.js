import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
import Introduce from './Section/Introduce'
import ExpertOpinion from './Section/ExpertOpinion'
import MedicalFacility from './Section/MedicalFacility'
import OutstandingDoctor from './Section/OutstandingDoctor'
import HandBookHealth from './Section/HandBookHealth'
import About from './Section/About'
import HomeFooter from '../HomePage/HomeFooter'

class HomePage extends Component {

    render() {

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={true}/>
                <Specialty />
                <Introduce />
                <ExpertOpinion />
                <MedicalFacility />
                <OutstandingDoctor />
                <About />
                <HandBookHealth />
                <HomeFooter />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
