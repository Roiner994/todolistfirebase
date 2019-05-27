import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../../actions/categories';
import { getCategories } from '../../../selectors/categories';
import TableReact from '../../../components/Tables/TableReact';
import ModalDelete from '../../../components/Modals/ModalDelete';
import { notification } from '../../../constants/notification';
import CardHeaderList from './../../../components/Cards/CardHeaderList';

const title = 'Categorias';
const urlPath = 'categories/';

const columns = [
    {
        dataField: 'id',
        text: 'Id'
    },
    {
        dataField: 'name',
        text: 'Nombre'
    }];

class CategoriesContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            id: '',
        };
    }

    componentDidMount = () => {
        if (this.props.categories.length <= 0) 
            this.props.fetchCategories();
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
        console.log('me estoy eliminando');
        this.props.deleteCategory(id).then(r => {
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
                                <CardHeaderList title={title} urlPath={urlPath} />
                            </CardHeader>
                            <CardBody>
                                {this.renderBody(this.props.categories)}
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


CategoriesContainer.defaultProps = {
    categories : []
};

const mapStateToProps = state => ({
    auth: state.authentication,
    categories : getCategories(state)
})

const mapDispatchToProps = { 
    fetchCategories, 
    deleteCategory 
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (CategoriesContainer));