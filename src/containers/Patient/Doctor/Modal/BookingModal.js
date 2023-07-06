import React, { Component } from 'react'
import { connect } from "react-redux"
import './BookingModal.scss'
import { Modal } from "reactstrap"
import ProfileDoctor from '../ProfileDoctor'
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { postPatientBookApointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment/moment'


class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders()
        this.setState({
        })
    }

    builDataGender = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = item.valueVi
                object.key = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType,
                })
            }
        }
    }

    handleOnchangeInput = (e, name) => {
        let valueInput = e.target.value
        let stateCopy = { ...this.state }
        stateCopy[name] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    HandleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = async (selectedGender) => {
        this.setState({ selectedGender })

    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildNameDoctor(this.props.dataTime)
        console.log('datatime:', this.props.dataTime)
        let res = await postPatientBookApointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: BigInt(this.props.dataTime.date),
            birthday: date,
            selectedGender: this.state.selectedGender.key,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName,
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = moment.unix(+ dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            return `${dataTime.timeTypeData.valueVi} - 
                    ${this.capitalizeFirstLetter(date)}`
        }
        return ''
    }

    buildNameDoctor = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime) && dataTime.doctorData) {
            let fullName = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return fullName
        }
        return ''
    }


    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'
                            onClick={closeBookingModal}
                        ><i className='fas fa-times'></i></span>
                    </div>

                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên:</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại:</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ email:</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ:</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám:</label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnchangeInput(e, 'reason')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày sinh:</label>
                                <DatePicker className='form-control'
                                    onChange={this.HandleOnChangeDatePicker}
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính:</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >Xác nhận</button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        >Hủy</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
