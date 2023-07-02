import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MedicalFacilityImg1 from '../../../assets/MedicalFacility/banner1.jpg'
import MedicalFacilityImg2 from '../../../assets/MedicalFacility/banner2.jpg'
import MedicalFacilityImg3 from '../../../assets/MedicalFacility/banner3.jpg'
import MedicalFacilityImg4 from '../../../assets/MedicalFacility/banner4.jpg'

class MedicalFacility extends Component {

    render() {
        let settings = {
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            draggable: false
        };
        return (
            <div className='section-medical-facility'>
                <div className='medical-facility-container'>
                    <div className='medical-facility-header'>
                        <span className='title-section'>Cơ sở nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='medical-facility-body'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={MedicalFacilityImg1} />
                                <div className='content'><h3>Cơ sở 1 Thành phố Hồ Chí Minh</h3></div>
                            </div>
                            <div className='img-customize'>
                                <img src={MedicalFacilityImg3} />
                                <div className='content'><h3>Cơ sở 2 Thành phố Hồ Chí Minh</h3></div>
                            </div>
                            <div className='img-customize'>
                                <img src={MedicalFacilityImg2} />
                                <div className='content'><h3>Cơ sở 3 Hà Nội</h3></div>
                            </div>
                            <div className='img-customize'>
                                <img src={MedicalFacilityImg4} />
                                <div className='content'><h3>Cơ sở 4 Đà Nẵng</h3></div>
                            </div>
                        </Slider>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
