import React, { Component } from 'react'
import { connect } from "react-redux"
import './ManageSchedule.scss'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment'
import _ from 'lodash'
import { dateFormat } from '../../../utils'
import { saveBulkScheduleDoctor } from '../../../services/userService'
import { toast } from 'react-toastify';


class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    builtDataInputSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                object.label = `${item.firstName} ${item.lastName}`
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builtDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data.map((item) => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                rangeTime: this.props.allScheduleTime,
            })
        }

    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    HandleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    hadleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            alert('Missing required parameters: Doctor')
            return
        }
        if (!currentDate) {
            alert('Missing required parameters: Date')
            return
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = time.keyMap
                    result.push(object)
                })
            } else {
                alert('Invalid selected time.')
                return
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
        })
        if (res && res.errCode === 0) {
            toast.success('Save information successfully!')
            this.setState({
                selectedDoctor: '',
                currentDate: '',
            })
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data.map((item) => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                rangeTime: this.props.allScheduleTime,
            })
        } else {
            toast.error('Save error information!')
        }
    }

    render() {
        let { rangeTime } = this.state
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className='manage-schedule-container'>
                <div className='ms-title'>
                    Quản lý kế hoạch khám bệnh của bác sĩ
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker className='form-control'
                                onChange={this.HandleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button key={index}
                                        className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                        type='button'
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >{item.valueVi}</button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button type='button'
                                className='btn btn-save-schedule-time'
                                onClick={() => this.hadleSaveSchedule()}
                            >Lưu thông tin</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
