import React, { Component } from 'react'
import { connect } from "react-redux"
import './RemedyModal.scss'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { CommonUtils } from '../../../utils'

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64,
            })
        }
    }

    handleSendRemery = () => {
        this.props.sendRemery(this.state)
    }

    render() {
        let { isOpenModal, dataModal, toggleFromParent } = this.props

        return (
            <Modal
                isOpen={isOpenModal}
                className={'remedy-modal-container'}
                toggle={() => { this.toggle() }}
                size='md'
                centered
            >
                <ModalHeader
                    toggle={() => { this.toggle() }} className='modal-title'>Gửi hóa đơn khám bệnh thành công </ModalHeader>
                <ModalBody>
                    <div className='modal-user-container'>
                        <div className='row modal-user-content' style={{ padding: '0 30px' }}>
                            <form>
                                <div className='row'>
                                    <div className="col-6">
                                        <label>Email:</label>
                                        <input type="email" className="form-control" placeholder="Email" name="email"
                                            onChange={(e) => { this.handleOnChangeEmail(e) }}
                                            value={this.state.email} />
                                    </div>

                                    <div className="col-6">
                                        <label >Ảnh:</label>
                                        <div className='img-container'>
                                            <input type="file"
                                                onChange={(e) => { this.handleOnChangeImage(e) }} />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-save-user px-3' color="primary"
                        onClick={() => { this.handleSendRemery() }}>Gửi</Button>
                    <Button className='btn-save-user px-3' color="primary"
                        onClick={() => { this.toggle() }}
                    >Close</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
