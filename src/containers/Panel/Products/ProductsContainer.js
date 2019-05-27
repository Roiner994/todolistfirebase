import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../actions/products';
import { fetchPathProducts } from '../../../actions/paths';
import { getProducts } from '../../../selectors/products';
import TableReact from '../../../components/Tables/TableReact';
import ModalDelete from '../../../components/Modals/ModalDelete';
import { notification } from '../../../constants/notification';
import CardHeaderList from './../../../components/Cards/CardHeaderList';
import { tableImage } from '../../../helpers/tableImage';

const title = 'Productos';
const urlPath = 'products/';

const columns = [
    {
        dataField: 'name',
        text: 'Nombre'
    },
    {
        dataField: 'cant',
        text: 'Cantidad'
    },
    {
        dataField: 'price',
        text: 'Precio'
    },
    {
        dataField: 'category.name',
        text: 'Categoria'
    }];

class ProductsContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: '',
        };
    }

    componentDidMount = () => {
        if (!this.props.paths.PUBLIC_PATH_PRODUCTS)
            this.props.fetchPathProducts();
        if (this.props.products.length <= 0) {
            this.props.fetchProducts();
        }
    }

    renderBody = (listObject) => {
        const cols = this.props.paths.PUBLIC_PATH_PRODUCTS ? 
            [tableImage(this.props.paths.PUBLIC_PATH_PRODUCTS), ...columns] :
            columns;
        return <TableReact
                listObject={listObject}
                urlPath={urlPath}
                columns={cols}
                data={listObject}
                isActions={true}
                showModal={this.handleShowModal} />
    };

    handleShowModal = (e, id) => {
        e.preventDefault();
        this.setState({ id })
        this.refs.modal.show();
    };

    handleDelete = (e, id) => {
        e.preventDefault();
        this.props.deleteProduct(id).then(r => {
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
                                {this.renderBody(this.props.products)}
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

ProductsContainer.defaultProps = {
    products: []
};

const mapStateToProps = state => ({
    auth: state.authentication,
    products: getProducts(state),
    paths: state.paths
})

const mapDispatchToProps = {
    fetchProducts,
    deleteProduct,
    fetchPathProducts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsContainer));