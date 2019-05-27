import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from './../../../actions/user';
import { getUsers } from './../../../selectors/users';
import TableReact from './../../../components/Tables/TableReact';
import ModalDelete from './../../../components/Modals/ModalDelete';
import { notification } from './../../../constants/notification';
import CardHeaderList from './../../../components/Cards/CardHeaderList';

const title = 'Usuarios';
const urlPath = 'users/';

const columns = [
    {
        dataField: 'id',
        text: 'Id'
    },
    {
        dataField: 'name',
        text: 'Nombre'
    },
    {
        dataField: 'email',
        text: 'Correo'
    }];

class UsersContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: '',
        };
    }

    componentDidMount = () => {
        if (this.props.users.length <= 0)
            this.props.fetchUsers();
            
    }

    renderBody = (listObject) => (
        <TableReact
            listObject={listObject}
            urlPath={urlPath}
            columns={columns}
            data={listObject}
            isActions={true}
            showModal={this.handleShowModal} />
    );

    handleShowModal = (e, id) => {
        e.preventDefault();
        this.setState({ id })
        this.refs.modal.show();
    };

    handleDelete = (e, id) => {
        e.preventDefault();
        this.props.deleteUser(id).then(r => {
            this.refs.modal.hide();
            notification('success', 'Usuario eliminado de manera correcta').show();
        }).catch(e => {
            this.refs.modal.hide();
            notification('error', e).show();
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <CardHeaderList title={title} urlPath={urlPath}/>
                            </CardHeader>
                            <CardBody>
                                {this.renderBody(this.props.users)}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ModalDelete 
                    ref="modal" 
                    id={this.state.id} 
                    onDelete={this.handleDelete}>
                </ModalDelete>
            </div>
        );
    }
}

UsersContainer.defaultProps = {
    users : []
};

const mapStateToProps = state => ({
    auth: state.authentication,
    users : getUsers(state)
})

const mapDispatchToProps = { 
    fetchUsers, 
    deleteUser 
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (UsersContainer));