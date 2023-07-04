import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleModal: {},
        }
    }

    async componentDidMount() {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (i === 0) {
                let labelViToday = moment(new Date()).format('DD/MM')
                let today = `Hôm nay ${labelViToday}`
                object.label = today
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                allDays.push(object)
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                object.label = this.capitalizeFirstLetter(labelVi)
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                allDays.push(object)
            }
        }
        this.setState({
            allDays: allDays
        })
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.state.allDays
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('ressss:', res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: time,
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleModal } = this.state

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    return (
                                        <button key={index}
                                            onClick={() => this.handleClickScheduleTime(item)}
                                        >{item.timeTypeData.valueVi}</button>
                                    )
                                })
                                : <div className='time-note'>Không có lịch hẹn trong thời gian này.</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
