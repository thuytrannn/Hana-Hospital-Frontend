import React, { Component } from 'react'
import { connect } from 'react-redux'
import './About.scss'
import { FormattedMessage } from 'react-intl'

class About extends Component {

    render() {

        return (
            <div className='section-about'>
                <div className='about-container'>
                    <div className='about-content-text content'>
                        <div className='about-title'>Thay đổi bản thân nhờ phẫu thuật thẩm mỹ. Tại sao không?</div>
                    </div>
                    <div className='about-content'>
                        <div className='about-video'>
                            <iframe width="91%" height="400px"
                                src="https://www.youtube.com/embed/geiouoMxAlc"
                                title="Tại sao dân Hàn Quốc nghiện phẫu thuật thẩm mỹ??" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                                picture-in-picture; web-share" allowFullScreen>
                            </iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
