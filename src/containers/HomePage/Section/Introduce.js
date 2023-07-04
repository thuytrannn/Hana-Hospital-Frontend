import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Introduce.scss'
import { FormattedMessage } from 'react-intl'

class Introduce extends Component {

    render() {

        return (
            <div className='section-introduce'>
                <div className='introduce-container'>
                    <div className='introduce-content content'>
                        <div className='title intro-title'>THẨM MỸ TIÊN PHONG</div>
                        <div className='sub-title'>CÔNG NGHỆ HÀN QUỐC</div>
                        <div className='text'>
                            Tiên phong cập nhật và chuyển giao công nghệ, máy móc tiên tiến từ Hàn Quốc, Hoa Kỳ, ...
                            đem đến giải pháp thẩm mỹ tối ưu.
                        </div>
                    </div>
                    <div className='introduce-image'>
                        <div className='img-custom'></div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Introduce);
