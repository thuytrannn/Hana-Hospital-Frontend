import React, { Component } from 'react'
import { connect } from 'react-redux'
import './OutstandingDoctor.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router'

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }

    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetaiDoctor = (doctor) => {
        console.log('view doctor: ', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
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
        let arrDoctors = this.state.arrDoctors

        return (
            <div className='section-outstanding-doctor'>
                <div className='outstanding-doctor-container'>
                    <div className='outstanding-doctor-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='outstanding-doctor-body'>
                        <Slider {...settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if(item.image){
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                }
                                let name = `${item.roleData.valueVi}. ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='img-customize' onClick={() => this.handleViewDetaiDoctor(item)} >
                                        <div className='img'
                                            style={{ backgroundImage: `url(${imageBase64})`, backgroundSize: 'contain' }}
                                        ></div>
                                        <div className='img-text content text-center'>
                                            <h3>{name}</h3>
                                            <span>Chuyên khoa Mắt</span>
                                        </div>
                                    </div>
                                )
                            })}
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
