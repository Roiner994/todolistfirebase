import React, { Component } from 'react';
import {Modal,ModalHeader, Button} from 'reactstrap';
import PropTypes from 'prop-types';

class ModalDelete extends Component {
    constructor(props, context) {
        super(props, context);  
        this.state = {
          smShow: false,
        };
    }

    show = () => this.setState({ smShow: true });

    hide = () => this.setState({ smShow: false });

    render() {
        const {onDelete , id} = this.props;
        return (
            <Modal
            size="sm"
            isOpen={this.state.smShow}
            aria-labelledby="example-modal-sizes-title-sm"
            className='modal-danger'
            >
                <ModalHeader toggle={this.hide}>
                    ¿Desea eliminar este elemento?
                    <br/>
                    <Button color="warning" onClick={this.hide}>Cancelar</Button>
                    &nbsp;
                    <Button color="primary" onClick={(e) => onDelete(e,id)}>Confirmar</Button>
                </ModalHeader>
            </Modal>
        );
    }
}

ModalDelete.propTypes = {
    onDelete: PropTypes.func,
};

export default ModalDelete;