import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeHeader.scss'
import logo from '../../assets/images/logo.jpg'
import { getAllSpecialties } from '../../services/userService'
import { withRouter } from 'react-router'


class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: [],
            dataFilter: [],
            isShowList: false,
        }
        this.node = React.createRef()
    }

    setDataFilter = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.key = item.id
                object.value = item.name
                result.push(object)
            })
        }
        return result
    }

    onSearchClick = async (e) => {
        let res = await getAllSpecialties()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
            let result = await this.setDataFilter(this.state.dataSpecialty)
            this.setState({
                dataFilter: result
            })
        }
        if (this.node.current.contains(e.target)) {
            return
        }
        this.setState({
            dataFilter: [],
            isShowList: true,
        })
    }

    handleAPI = async (e) => {
        let res = await getAllSpecialties()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
            let result = await this.setDataFilter(this.state.dataSpecialty)
            this.setState({
                dataFilter: result
            })
            let convertToLc = e.target.value.toLowerCase()
            let filterData = this.state.dataFilter.filter((e) => {
                let nameToLc = e.value.toLowerCase()
                return nameToLc.indexOf(convertToLc) !== -1
            })
            this.setState({
                dataFilter: filterData,
                isShowList: true
            })
        }
    }

    handleOnclickSearch = (item) => {
        console.log('viewClick: ', item)
        this.props.history.push(`/detail-specialty/${item.key}`)
    }

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <img src={logo} className='header-logo'></img>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='text-content'>
                                    <a href='#Specialty'>
                                        <div><b>Dịch vụ</b></div>
                                        <div className='sub-title'>Dịch vụ phổ biến</div>
                                    </a>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-content'>
                                    <a href='#MedicalFacility'>
                                        <div><b>Cơ sở y tế</b></div>
                                        <div className='sub-title'>Chọn bệnh viện phòng khám</div>
                                    </a>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-content'>
                                    <a href='#OutstandingDoctor'>
                                        <div><b>Bác sĩ</b></div>
                                        <div className='sub-title'>Chọn bác sĩ giỏi</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i>Hỗ trợ</div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>BỆNH VIỆN THẨM MỸ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <div className='input-search'>
                                    <i className='fas fa-search'></i>
                                    <input
                                        type="text"
                                        onClick={this.onSearchClick}
                                        className="form-control"
                                        onChange={this.handleAPI}
                                        placeholder="Tìm kiếm dịch vụ ..."
                                        ref={this.node}
                                    />
                                </div>
                                {this.state.isShowList === true &&
                                    <ul className="list-group">
                                        {this.state.dataFilter.map((res) => {
                                            return (
                                                <li>
                                                    <a
                                                        ref={this.node}
                                                        onClick={() => this.handleOnclickSearch(res)}
                                                        className="list-group-item list-group-item-action"
                                                        key={res.key}
                                                    >
                                                        {res.value}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                }
                            </div>

                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'>Khám chuyên khoa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='text-child'>Thăm khám từ xa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                    <div className='text-child'>Khám tổng quát</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i></div>
                                    <div className='text-child'>Xét nghiệm y học</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                    <div className='text-child'>Sức khỏe tinh thần</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-briefcase-medical'></i></div>
                                    <div className='text-child'>khám nha khoa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
