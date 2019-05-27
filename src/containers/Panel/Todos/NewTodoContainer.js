import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { insertTodo , fetchTodos } from "./../../../actions/todos";
import TodoForm from "./../../../components/Forms/TodoForm";

class NewUserContainer extends Component {

    componentDidMount = () => {
        // if(this.props.users.length <= 0)
        //     this.props.fetchUsers();
    }    

    handleSubmit = values => {
        const todo = {text: values.text};
        return this.props.insertTodo(todo).then( r => {
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
        <TodoForm onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleBack}/>
    );

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="12" xl="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Nueva Tarea</h2>
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
    insertTodo,
    fetchTodos
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewUserContainer));