import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Specialty.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getAllSpecialties } from '../../../services/userService'
import { withRouter } from 'react-router'


class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
        //     this.setState({
        //     })
        // }

    }

    async componentDidMount() {
        let res = await getAllSpecialties()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetaiSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }


    render() {
        let { dataSpecialty } = this.state
        let settings = {
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            draggable: false
        };
        return (
            <>
                <div id='Specialty'></div>
                <div className='section-specialty'>
                    <div className='specialty-container'>
                        <div className='specialty-header'>
                            <span className='title-section'>Dịch vụ nổi bật</span>
                        </div>
                        <div className='specialty-body'>
                            <Slider {...settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='img-customize' key={index}
                                                onClick={() => this.handleViewDetaiSpecialty(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
