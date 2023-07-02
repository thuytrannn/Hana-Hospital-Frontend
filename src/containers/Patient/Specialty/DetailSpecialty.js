import React, { Component } from 'react'
import { connect } from "react-redux"
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader'


class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

        this.setState({
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {

        }
    }


    render() {

        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    Detail specialty
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
