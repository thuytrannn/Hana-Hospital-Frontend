import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss"
import * as actions from '../../../store/actions'
import TableManageUser from './TableManageUser'

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            position: '',
            gender: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                position: '',
                gender: '',
                role: '',
                avatar: '',
            })
        }

    }

    handleOnChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: file,
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) {

        }
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        })
        this.props.fetchUsersRedux()
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert(`This input is required: ${arrCheck[i]}`)
                break
            }
        }
        return isValid
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let { email, password, firstName, lastName, address, phonenumber,
            position, gender, role, avatar
        } = this.setState
        return (
            <div className='user-redux-container'>
                <div className='title' style={{ color: "rgb(219, 58, 115)" }}>User Redux</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row '>
                            <form>
                                <div className="row">
                                    <div className='col-12 mb-4 mt-3 sub-title'>Thêm mới người dùng:</div>
                                    <div className="col-6 mb-2">
                                        <label>Email:</label>
                                        <input type="email" className="form-control"
                                            placeholder="Email" name="email"
                                            value={email}
                                            onChange={(e) => { this.onChangeInput(e, 'email') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-2">
                                        <label>Mật khẩu:</label>
                                        <input type="password" className="form-control"
                                            name="password" placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) => { this.onChangeInput(e, 'password') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-2">
                                        <label >Họ:</label>
                                        <input type="text" className="form-control"
                                            placeholder="Họ" name="firstName"
                                            value={firstName}
                                            onChange={(e) => { this.onChangeInput(e, 'firstName') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-2">
                                        <label >Tên:</label>
                                        <input type="text" className="form-control"
                                            name="lastName" placeholder="Tên"
                                            value={lastName}
                                            onChange={(e) => { this.onChangeInput(e, 'lastName') }}
                                        />
                                    </div>

                                    <div className="col-6 mb-2">
                                        <label>Địa chỉ:</label>
                                        <input type="text" className="form-control"
                                            name="address" placeholder="Địa chỉ"
                                            value={address}
                                            onChange={(e) => { this.onChangeInput(e, 'address') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-2">
                                        <label>Số điện thoại:</label>
                                        <input type="text" className="form-control"
                                            name="phonenumber" placeholder='SĐT'
                                            value={phonenumber}
                                            onChange={(e) => { this.onChangeInput(e, 'phonenumber') }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>Chức vụ:</label>
                                        <select name="positionId" className="form-control"
                                            onChange={(e) => { this.onChangeInput(e, 'position') }}>
                                            {positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-3 mb-2">
                                        <label>Giới tính:</label>
                                        <select name="gender" className="form-control"
                                            onChange={(e) => { this.onChangeInput(e, 'gender') }}>
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-3 mb-2">
                                        <label>Vai trò:</label>
                                        <select name="roleId" className="form-control"
                                            onChange={(e) => { this.onChangeInput(e, 'role') }}>
                                            {roles && roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <label >Ảnh:</label>
                                        <div className='preview-img-container'>
                                            <input type="file" id='previewImg' hidden
                                                onChange={(e) => { this.handleOnChangeImage(e) }} />
                                            <label className="label-upload" htmlFor='previewImg'>Tải ảnh<i className='fas fa-upload'></i></label>
                                            <div className='preview-image'
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <button type='button' className='btn btn-primary col-1 mb-1'
                                    style={{ float: "right", backgroundColor: "rgb(219, 58, 115)" }}
                                    onClick={() => { this.handleSaveUser() }}>
                                    Lưu
                                </button>
                            </form>
                            <div className='col-12 table-user'><TableManageUser /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart())
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
