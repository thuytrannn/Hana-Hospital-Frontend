
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { emitter } from '../../utils/emitter';
import _ from 'lodash'
import * as actions from '../../store/actions'

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
            avatar: '',
            previewImgURL: '',
            genderArr: [],
            roleArr: [],
        }
    }

    componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {   //function of lodash
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
                previewImgURL: user.image,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log('copyState:', copyState)
        })
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check loop:', this.state[arrInput[i]])
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Missing parameter: ${arrInput[i]}`)
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }

    render() {
        let { genderArr, roleArr } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }} className='abcClassName'
                size='lg'
                centered
            >
                <ModalHeader
                    toggle={() => { this.toggle() }} className='modal-title'>Chỉnh sửa người dùng</ModalHeader>
                <ModalBody>
                    <div className='modal-user-container'>
                        <div className='modal-user-content' style={{ padding: '0 30px' }}>
                            <form action="/post-crud" method="POST">
                                <div className='row'>
                                    <div className="col-6 mb-3">
                                        <label>Email:</label>
                                        <input type="email" className="form-control" placeholder="Email" name="email"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'email') }}
                                            value={this.state.email} disabled />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Mật khẩu:</label>
                                        <input type="password" className="form-control" name="password" placeholder="Mật khẩu"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'password') }}
                                            value={this.state.password} disabled />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >Họ:</label>
                                        <input type="text" className="form-control" placeholder="Họ" name="firstName"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'firstName') }}
                                            value={this.state.firstName} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >Tên:</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="Tên"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'lastName') }}
                                            value={this.state.lastName} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Địa chỉ:</label>
                                        <input type="text" className="form-control" name="address" placeholder="Địa chỉ"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'address') }}
                                            value={this.state.address} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Số điện thoại:</label>
                                        <input type="text" className="form-control" name="phonenumber" placeholder='SĐT'
                                            onChange={(e) => { this.handleOnChangeInput(e, 'phonenumber') }}
                                            value={this.state.phonenumber} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Giới tính:</label>
                                        <select name="gender" className="form-control"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'gender') }}
                                            value={this.state.gender}>
                                            {genderArr && genderArr.length > 0 &&
                                                genderArr.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Vai trò:</label>
                                        <select name="roleId" className="form-control"
                                            onChange={(e) => { this.handleOnChangeInput(e, 'roleId') }}
                                            value={this.state.roleId} disabled>
                                            {roleArr && roleArr.length > 0 &&
                                                roleArr.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-save-user px-3' color="primary"
                        onClick={() => { this.handleSaveUser() }}>Lưu thay đổi</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



