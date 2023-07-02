import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ExpertOpinion.scss'
import { FormattedMessage } from 'react-intl'
import banner1 from '../../../assets/Expert-opinion/banner1.jpg'
import banner2 from '../../../assets/Expert-opinion/banner2.jpg'
  

class ExpertOpinion extends Component {

    render() {       
        
        return (
            
            <div className='section-expert-opinion'>
                <div className='expert-opinion-container'>
                    <div className='expert-opinion-body'>
                        <div class="slider">
                            <div class="slide">
                                <img src={banner1} alt="" class="img" />
                                <div className='content'>
                                    <div className='text'>
                                        Hạnh phúc là được làm đẹp cho người, làm đẹp cho đời...
                                        Và đó là động lực để chúng tôi không ngừng nỗ lực để tạo ra giá trị.
                                    </div>
                                    <div className='doctor'>
                                        BS. HwangChoel
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpertOpinion);
