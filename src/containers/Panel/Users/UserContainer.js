import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row , Spinner} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fetchUsers, updateUser } from './../../../actions/user';
import {notification} from "./../../../constants/notification";
import { getUsers, getUserById } from './../../../selectors/users';
import UserForm from './../../../components/Forms/UserForm';

class UserContainer extends Component {
    componentDidMount = () => {
        if(this.props.users.length <= 0)
            this.props.fetchUsers();
    }

    renderBody = () => {
        if (this.props.user){
            return <UserForm {...this.props.user}
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleBack}
            onSubmitFail = {this.handleOnSubmitFail}
            isEdit={true}
            />
        } 
        return <Spinner animation="border" color="primary" />;
    };

    handleSubmit = values => {
        const { id } = values; 
        return this.props.updateUser(id, values).then( r => {
        }).catch(e => {
            throw new SubmissionError(e);
        });
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        notification( 'success', 'Usuario actializado correctamente' ).show();
        this.props.history.goBack();
    }

    handleOnSubmitFail = (e) => {
        notification( 'error', e ).show();
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Editar Usuario</h2>
                                    {this.renderBody()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

UserContainer.proTypes = {
    id: PropTypes.number.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    auth: state.authentication,
    users : getUsers(state),
    user: getUserById(state,props)
})

const mapDispatchToProps ={
    fetchUsers, 
    updateUser
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (UserContainer));