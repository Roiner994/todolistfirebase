import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { insertUser , fetchUsers } from "./../../actions/user";
import UserForm from "./../../components/Forms/UserForm";

class NewUserContainer extends Component {

    componentDidMount = () => {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/panel/dashboard');
        }
    }    

    handleSubmit = values => {
        return this.props.insertUser(values).then( r => {
        }).catch( e => {
            throw new SubmissionError(e);
        });
    }
    
    handleBack = () => {
        this.props.history.goBack();
    };
    
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    renderBody = () => (
        <UserForm onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleBack}/>
    );

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Regitro</h2>
                                    <p className="text-muted">Crear tu cuenta</p>
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

const mapStateToProps = state => ({
    auth: state.authentication,
})
const mapDispatchToProps = {
    insertUser,
    fetchUsers
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewUserContainer));