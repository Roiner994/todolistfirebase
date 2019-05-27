import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodos, deleteTodo } from './../../../actions/todos';
import TableReact from './../../../components/Tables/TableReact';
import ModalDelete from './../../../components/Modals/ModalDelete';
import { notification } from './../../../constants/notification';
import CardHeaderList from './../../../components/Cards/CardHeaderList';

const title = 'Tareas';
const urlPath = 'todos/';

const columns = [
    {
        dataField: 'id',
        text: 'Id'
    },
    {
        dataField: 'text',
        text: 'Tarea'
    }];

class TodosContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: '',
        };
    }

    componentDidMount = () => {
        if (this.props.todos.length <= 0)
            this.props.fetchTodos();
            
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
        this.props.deleteTodo(id).then(r => {
            this.refs.modal.hide();
            notification('success', 'Tarea eliminada de manera correcta').show();
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
                                {this.renderBody(this.props.todos)}
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

TodosContainer.defaultProps = {
    todos : []
};

const mapStateToProps = state => ({
    auth: state.authentication,
    todos : state.todos
})

const mapDispatchToProps = { 
    fetchTodos, 
    deleteTodo 
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (TodosContainer));