import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HandBookHealth.scss'
import { FormattedMessage } from 'react-intl'
import HandBookHealthSlide from '../../../assets/HandBookHealth/banner1.jpg'
import HandBookHealthImg1 from '../../../assets/HandBookHealth/banner2.jpg'
import HandBookHealthImg2 from '../../../assets/HandBookHealth/banner3.jpg'
import HandBookHealthImg3 from '../../../assets/HandBookHealth/banner4.jpg'

class HandBookHealth extends Component {

    render() {

        return (
            <div className='section-handbook'>
                <div className='handbook-header'>
                    <div className='handbook-title'>Cẩm nang sức khỏe</div>
                </div>
                <div className='handbook-container'>
                    <div className='handbook-banner'>
                        <div className='banner'><img src={HandBookHealthSlide}></img></div>
                    </div>
                    <div className='handbook-body'>
                    <div className='img-customize content'>
                            <div className='img'><img src={HandBookHealthImg1} /></div>
                            <div className='handbook-text'>
                                <h3>Ăn uống healthy để đẹp từ trong ra ngoài</h3>
                                <span>Chế độ ăn uống cũng ảnh hưởng rất lớn tới sức khỏe...</span>
                            </div>
                        </div>
                        <div className='img-customize content'>
                            <div className='img'><img src={HandBookHealthImg2} /></div>
                            <div className='handbook-text'>
                                <h3>Sau khi xăm nên kiêng gì? Những lưu ý quan trọng cần biết.</h3>
                                <span>Những hình xăm mang lại nét độc đáo riêng biệt và có tính thẩm mĩ...</span>
                            </div>
                        </div>
                        <div className='img-customize content'>
                            <div className='img'><img src={HandBookHealthImg3} /></div>
                            <div className='handbook-text'>
                                <h3>Những thực phẩm tốt giúp ngăn ngừa lão hóa sớm.</h3>
                                <span>Trái cây cung cấp rất nhiều vitamin tốt cho sức khỏe...</span>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBookHealth);
