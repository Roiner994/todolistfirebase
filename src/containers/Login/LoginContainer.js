import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import LoginForm from '../../components/Forms/LoginForm';
import { authentication } from "./../../actions/authentication";
import { notification } from "./../../constants/notification";
import firebase from '../../initializer/firebase';

class LoginContainer extends Component {

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/panel/dashboard');
        }
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        notification('success', 'Bienvenido').show();
        this.props.history.push("/panel/dashboard");
    }

    handleOnSubmitFail = (e) => {
        notification('error', e).show();
    }

    handleSubmit = (values) => {
        const providerGoogle = new firebase.auth.GoogleAuthProvider();
        const providerFacebook = new firebase.auth.FacebookAuthProvider();
        return this.props.authentication(providerGoogle).then(r => {
        }).catch(e => {
            throw new SubmissionError(e);
        });
    }

    renderBody = () => (
        <LoginForm
            onBack={this.handleBack}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onSubmit={this.handleSubmit}
            onSubmitFail={this.handleOnSubmitFail} />
    );

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Login</h1>
                                        <p className="text-muted">Inicial Sesion en tu cuenta con</p>
                                        {this.renderBody()}
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>App React</h2>
                                            <p>Todo list hecho con react y firebase con authenticacion por google</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authentication,
});

const mapDispatchToProps = {
    authentication,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));