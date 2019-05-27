import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fetchProducts, updateProduct } from './../../../actions/products';
import { fetchCategories } from './../../../actions/categories';
import { fetchPathProducts } from './../../../actions/paths';
import { notification } from "./../../../constants/notification";
import { getProducts, getProductById } from './../../../selectors/products';
import { getCategories } from './../../../selectors/categories';
import ProductForm from './../../../components/Forms/ProductForm';
import { parseFormData } from '../../../helpers/setHeaders';

class ProductContainer extends Component {

    componentDidMount = () => {
        if (!this.props.paths.PUBLIC_PATH_PRODUCTS)
            this.props.fetchPathProducts();
        if (this.props.categories.length <= 0)
            this.props.fetchCategories();
        if (this.props.products.length <= 0)
            this.props.fetchProducts();
    }

    renderBody = () => {
        if (this.props.product && this.props.paths.PUBLIC_PATH_PRODUCTS) {
            return <ProductForm {...this.props.product}
                onSubmit={this.handleSubmit}
                onSubmitSuccess={this.handleOnSubmitSuccess}
                onBack={this.handleBack}
                onSubmitFail={this.handleOnSubmitFail}
                isEdit={true}
                categories={this.props.categories}
                pathPublic={this.props.paths.PUBLIC_PATH_PRODUCTS}
            />
        }
        return <Spinner animation="border" color="primary" />;
    };

    handleSubmit = values => {
        const { id } = values;
        let formData = parseFormData(values);
        return this.props.updateProduct(id, formData).then(r => {
        }).catch(e => {
            throw new SubmissionError(e);
        });
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        notification('success', 'Usuario actializado correctamente').show();
        this.props.history.goBack();
    }

    handleOnSubmitFail = (e) => {
        notification('error', e).show();
    }

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="12" xl="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Editar</h2>
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


ProductContainer.defaultProps = {
    products: [],
    categories: [],
    paths:{}
};

const mapStateToProps = (state, props) => ({
    auth: state.authentication,
    products: getProducts(state),
    categories: getCategories(state),
    product: getProductById(state, props),
    paths: state.paths
})

const mapDispatchToProps = {
    fetchProducts,
    updateProduct,
    fetchCategories,
    fetchPathProducts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductContainer));