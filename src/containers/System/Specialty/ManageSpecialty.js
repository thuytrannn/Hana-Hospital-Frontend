import React, { Component } from 'react'
import { connect } from "react-redux"
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { CommonUtils } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify'
import { getDetailSpecialtyById, getAllSpecialties, saveInforSpecialty } from '../../../services/userService'
import Select from 'react-select'
import _ from 'lodash'


const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedSpecialty: '',
            listSpecialty: [],
            specialtyId: '',
            createSpecialty: true,
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialties()
        console.log('res:', res)
        if (res && res.errCode === 0) {
            let dataSelect = this.builtDataInputSelect(res.data, 'SPECIALTY')
            this.setState({
                listSpecialty: dataSelect,
            })
        }
    }

    builtDataInputSelect = (inputData, type) => {
        let result = []
        if (inputData && inputData.length > 0) {
            if (type === 'SPECIALTY') {
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
                imageBase64: base64,
            })
        }
    }

    handleSaveSpecialty = async () => {
        if (this.state.createSpecialty === true) {
            let res = await createNewSpecialty(this.state)
            if (res && res.errCode === 0) {
                toast.success('Save information successfully!')
                let stateCopy = { ...this.state }
                stateCopy = {
                    name: '',
                    imageBase64: '',
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
            let res = await saveInforSpecialty(this.state)
            console.log('this.state:', this.state)
            if (res && res.errCode === 0) {
                toast.success('Save information successfully!')
                let stateCopy = { ...this.state }
                stateCopy = {
                    name: '',
                    imageBase64: '',
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

    handleChangeSelectSpecialty = async (selectedSpecialty) => {
        this.setState({
            selectedSpecialty: selectedSpecialty,
            createSpecialty: false,
            specialtyId: selectedSpecialty.value,
        })
        let res = await getDetailSpecialtyById(
            {
                id: selectedSpecialty.value,
                location: 'All'
            })
        if (res && res.errCode === 0 && res.data && !_.isEmpty(res.data)) {
            this.setState({
                descriptionMarkdown: res.data.descriptionMarkdown,
                descriptionHTML: res.data.descriptionHTML,
            })
        }
    }

    render() {
        let { createSpecialty } = this.state

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-4 form-group'>
                        <label>Thêm chuyên khoa</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                            disabled={createSpecialty === false && 'disabled'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Sửa chuyên khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectSpecialty}
                            options={this.state.listSpecialty}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ảnh chuyên khoa</label>
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
                        <button className='btn-save-content-specialty' type='button'
                            onClick={() => this.handleSaveSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
