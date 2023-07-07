import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService'
import moment from 'moment'
import RemedyModal from './RemedyModal'
import { toast } from 'react-toastify'
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()
        console.log('formattedDate:', formattedDate, typeof (formattedDate))
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {

        }
    }

    HandleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal,
        })
    }

    sendRemery = async (data) => {
        this.setState({
            isShowLoading: true
        })
        let { dataModal } = this.state
        let res = await postSendRemedy({
            email: data.email,
            imgBase64: data.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy succeed!')
            this.toggleUserModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrong...')
        }
    }


    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='manage-patient-title'>Quản lý bệnh nhân khám bệnh</div>
                        <div className='manage-patient-body'>
                            <div className='row'>
                                <div className='col-6 form-group input-date'>
                                    <label>Chọn ngày:</label>
                                    <DatePicker className='form-control'
                                        onChange={this.HandleOnChangeDatePicker}
                                        value={this.state.currentDate}
                                    />
                                </div>
                                <table id="TableManageUser" className='col-12'>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ tên</th>
                                            <th>Email</th>
                                            <th>Giới tính</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataPatient
                                                            && item.timeTypeDataPatient.valueVi ?
                                                            item.timeTypeDataPatient.valueVi : ''}</td>
                                                        <td>{item.patientData && item.patientData.firstName ?
                                                            item.patientData.firstName : ''}</td>
                                                        <td>{item.patientData && item.patientData.email ?
                                                            item.patientData.email : ''}</td>
                                                        <td>{item.patientData && item.patientData.genderData.valueVi ?
                                                            item.patientData.genderData.valueVi : ''}</td>
                                                        <td>{item.patientData && item.patientData.address ?
                                                            item.patientData.address : ''}</td>
                                                        <td>
                                                            <button className='mp-btn mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr><td colSpan="7" className='no-data'>Không có lịch hẹn trong thời gian này.</td></tr>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        toggleFromParent={this.toggleUserModal}
                        sendRemery={this.sendRemery}
                    />
                </LoadingOverlay>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
