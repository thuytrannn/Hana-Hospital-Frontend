import React, { Component } from 'react'
import { connect } from "react-redux"
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { CommonUtils } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify'
import { getDetailSpecialtyById, getAllSpecialties, saveInforSpecialty } from '../../../services/userService'
import Select from 'react-select'
import _ from 'lodash'
import { getAllClinics, createNewClinic, saveInforClinic, getDetailClinicById } from '../../../services/userService'


const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            selectedClinic: '',
            listClinic: [],
            clinicId: '',
            createClinic: true,
        }
    }

    async componentDidMount() {
        let res = await getAllClinics()
        if (res && res.errCode === 0) {
            let dataSelect = this.builtDataInputSelect(res.data, 'CLINIC')
            this.setState({
                listClinic: dataSelect,
            })
        }
    }

    builtDataInputSelect = (inputData, type) => {
        let result = []
        if (inputData && inputData.length > 0) {
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeInput = (e, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                image: base64,
            })
        }
    }

    handleSaveClinic = async () => {
        if (this.state.createClinic === true) {
            let res = await createNewClinic(this.state)
            if (res && res.errCode === 0) {
                toast.success('Save information successfully!')
                let stateCopy = { ...this.state }
                stateCopy = {
                    name: '',
                    image: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                }
                this.setState({
                    ...stateCopy
                })
            } else {
                toast.error('Save error information!')
            }
        }
        else {
            let res = await saveInforClinic(this.state)
            console.log('this.state:', this.state)
            if (res && res.errCode === 0) {
                toast.success('Save information successfully!')
                let stateCopy = { ...this.state }
                stateCopy = {
                    name: '',
                    image: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                }
                this.setState({
                    ...stateCopy
                })
            } else {
                toast.error('Save error information!')
            }
        }
    }

    handleChangeSelectClinic = async (selectedClinic) => {
        this.setState({
            selectedClinic: selectedClinic,
            createClinic: false,
            clinicId: selectedClinic.value,
        })
        let res = await getDetailClinicById(
            {
                id: selectedClinic.value,
            })
        if (res && res.errCode === 0 && res.data && !_.isEmpty(res.data)) {
            this.setState({
                descriptionMarkdown: res.data.descriptionMarkdown,
                descriptionHTML: res.data.descriptionHTML,
                address: res.data.address,
                image: res.data.image,
            })
        }
        console.log('stateClinic:', this.state)
    }

    render() {
        let { createClinic } = this.state

        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Thêm phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                            disabled={createClinic === false && 'disabled'}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Sửa phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectClinic}
                            options={this.state.listClinic}
                            name='selectedClinic'
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Đia chỉ phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className='manage-doctor-editor col-12'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown} />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-content-clinic' type='button'
                            onClick={() => this.handleSaveClinic()}
                        >Lưu thông tin</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
