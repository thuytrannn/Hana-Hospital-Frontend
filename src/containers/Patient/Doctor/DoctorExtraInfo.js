import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { getExtraInforDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let price = extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData.valueVi
            ? extraInfor.priceTypeData.valueVi : ''

        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-info'>
                            <span className='text-1'>GIÁ KHÁM:</span>
                            {extraInfor && extraInfor.priceTypeData &&
                                <NumberFormat
                                    value={price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            <span className='text-2' onClick={() => this.showHideDetailInfo(true)}>
                                Xem chi tiết
                            </span></div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám:</span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData &&
                                            <NumberFormat
                                                value={price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>Được ưu tiên khám trước khi đặt qua website.</div>
                            </div>
                            <div className='payment'>Có thể thanh toán bằng tiền mặt hoặc chuyển khoản.</div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>Ẩn bảng giá.</span>
                            </div>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
