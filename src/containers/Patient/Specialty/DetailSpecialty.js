import React, { Component } from 'react'
import { connect } from "react-redux"
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash'

class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'All'
            })

            let resProvince = await getAllCodeService('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProcince = resProvince.data
                if (dataProcince && dataProcince.length > 0) {
                    dataProcince.unshift({
                        createdAt: null,
                        updatedAt: null,
                        keyMap: 'All',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc',
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProcince,
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {

        }
    }

    HandleOnChangeSearch = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: e.target.value
            })

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }
    }


    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>
                        <div className='detail-specialty-content'>
                            <div className='description-specialty'>
                                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                    </div>
                                }
                            </div>
                            <div className='search-sp-doctor'>
                                <select onChange={(e) => this.HandleOnChangeSearch(e)}>
                                    {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                        return (
                                            <option key={index}
                                                value={item.keyMap}
                                            >{item.valueVi}</option>
                                        )
                                    })}

                                </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
