import React, { Component } from 'react'
import { connect } from "react-redux"
import HomeHeader from '../../HomePage/HomeHeader'
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService'
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from './DoctorExtraInfo'

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
            })
        }

    }

    render() {
        const { systemMenuPath } = this.props
        let { detailDoctor } = this.state
        let name = ''
        if (detailDoctor) {
            name = `Bác sĩ. ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <React.Fragment >
                <div className="doctor-detail">
                    <HomeHeader isShowBanner={false} />
                    <div className="doctor-detail-container">
                        <div className='doctor-detail-body'>
                            <div className='intro-doctor'>
                                <div className='content-left'
                                    style={{
                                        backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                                        backgroundSize: 'cover'
                                    }}
                                >
                                </div>
                                <div className='content-right'>
                                    <div className='up'>
                                        {name}
                                    </div>
                                    <div className='down'>
                                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                            <span>
                                                {detailDoctor.Markdown.description}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='schedule-doctor'>
                                <div className='content-left'>
                                    <DoctorSchedule
                                        doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                                </div>
                                <div className='content-right'>
                                    <DoctorExtraInfo
                                        doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                                </div>
                            </div>

                            <div className='detail-infor-doctor'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
