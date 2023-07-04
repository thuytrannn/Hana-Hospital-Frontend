import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getAllClinics } from '../../../../src/services/userService'
import { withRouter } from 'react-router'


class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataClinic: [],
        }
    }

    async componentDidMount() {
        let res = await getAllClinics()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetaiClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let settings = {
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            draggable: false
        };

        let { dataClinic } = this.state

        return (
            <>
                <div id='MedicalFacility'></div>
                <div className='section-medical-facility'>
                    <div className='medical-facility-container'>
                        <div className='medical-facility-header'>
                            <span className='title-section'>Cơ sở nổi bật</span>
                        </div>
                        <div className='medical-facility-body'>
                            <Slider {...settings}>
                                {dataClinic && dataClinic.length > 0
                                    && dataClinic.map((item, index) => {
                                        return (
                                            <div className='img-customize' key={index}
                                                onClick={() => this.handleViewDetaiClinic(item)}>
                                                <img src={item.image} />
                                                <div className='content'><h3>{item.name}</h3></div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
