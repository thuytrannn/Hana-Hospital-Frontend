import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { divide } from 'lodash';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handelOnChangeEmail = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handelOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login success!')
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin()
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Đăng nhập</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email:</label>
                            <input type='text' className='form-control' placeholder='Email'
                                value={this.state.username}
                                onChange={(event) => this.handelOnChangeEmail(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control' placeholder='Mật khẩu'
                                    value={this.state.password}
                                    onChange={(event) => this.handelOnChangePassword(event)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                ></input>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-login' onClick={() => this.handleLogin()}>Đăng nhập</button>
                        </div>
                        <div className='col-12'>
                            <span className='text-note'>Quên mật khẩu?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-note'>Đăng nhập với:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <a><i className="fab fa-google-plus-g google"></i></a>
                            <a><i className="fab fa-facebook facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
