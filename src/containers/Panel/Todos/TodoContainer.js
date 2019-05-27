import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row , Spinner} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fetchTodos, updateTodo } from './../../../actions/todos';
import {notification} from "./../../../constants/notification";
import { getTodos, getTodoById } from './../../../selectors/todos';
import TodoForm from './../../../components/Forms/TodoForm';

class TodoContainer extends Component {
    componentDidMount = () => {
        this.props.fetchTodos();
    }

    renderBody = () => {
        if (this.props.todo){
            return <TodoForm {...this.props.todo}
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
        const { id, text } = values; 
        const todo = { text };
        return this.props.updateTodo(id, todo).then( r => {
        }).catch(e => {
            console.log(e);
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
                                    <h2>Editar Tarea</h2>
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

TodoContainer.proTypes = {
    id: PropTypes.number.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    todo: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    auth: state.authentication,
    todos : getTodos(state),
    todo: getTodoById(state,props)
})

const mapDispatchToProps ={
    fetchTodos, 
    updateTodo
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (TodoContainer));