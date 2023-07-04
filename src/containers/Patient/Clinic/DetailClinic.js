import React, { Component } from 'react'
import { connect } from "react-redux"
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailSpecialtyById, getAllCodeService, getDetailClinicById } from '../../../services/userService'
import _ from 'lodash'

class DetailClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinicById({
                id: id,
            })


            if (res && res.errCode === 0) {
                let data = res.data
                console.log('resclinic:', res)
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {

        }
    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        return (
            <>
                <div className='detail-clinic-container'>
                    <HomeHeader />
                    <div className='detail-clinic-body'>
                        <div className='detail-clinic-content'>
                            <div className='description-clinic'>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    </div>
                                }
                            </div>
                            {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                                return (
                                    <>
                                        <div className='each-doctor' key={index}>
                                            <div className='dt-content-left'>
                                                <div className='profile-doctor'>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescriptionDoctor={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
                                                    // dataTime={dataTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className='dt-content-right'>
                                                <div className='doctor-schedule'>
                                                    <DoctorSchedule
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                                <div className='doctor-extra-infor'>
                                                    <DoctorExtraInfo
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
