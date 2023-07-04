import React, { Component } from 'react'
import { connect } from "react-redux"
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import moment from 'moment/moment'
import { Link } from "react-router-dom"

class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorId !== this.props.doctorId) {
            this.getInforDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = moment.unix(+ dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            return (
                <>
                    <div>{`Thời gian: ${dataTime.timeTypeData.valueVi} - 
                    ${this.capitalizeFirstLetter(date)}`}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props
        let { dataProfile } = this.state
        let name = ''
        if (dataProfile) {
            name = `Bác sĩ. ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log('dataprofile: ', dataProfile)
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                            backgroundSize: 'cover'
                        }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {name}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                        {isShowLinkDetail === true && <div className='more-infor-doctor'>
                            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                        </div>}
                        {isShowPrice === true &&
                            <div className='price'>
                                <span className='text-1'>Giá khám:</span>
                                {dataProfile && dataProfile.Doctor_info ?
                                    < NumberFormat
                                        value={dataProfile.Doctor_info.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                    : ''}
                            </div>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
