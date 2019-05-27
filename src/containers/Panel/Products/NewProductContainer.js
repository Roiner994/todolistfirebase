import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { insertProduct, fetchProducts } from "./../../../actions/products";
import { fetchCategories } from "./../../../actions/categories";
import { fetchPathProducts } from './../../../actions/paths';
import ProductForm from "./../../../components/Forms/ProductForm";
import { notification } from '../../../constants/notification';
import { PREFIXPANEL } from './../../../constants';
import { parseFormData } from '../../../helpers/setHeaders';


class NewProductContainer extends Component {
    componentDidMount = () => {
        if (!this.props.paths.PUBLIC_PATH_PRODUCTS)
            this.props.fetchPathProducts();
        if (this.props.categories.length <= 0)
            this.props.fetchCategories();
        if (this.props.products.length <= 0)
            this.props.fetchProducts();
    }

    handleSubmit = values => {
        let formData = parseFormData(values);
        return this.props.insertProduct(formData).then(r => {
        }).catch(e => {
            throw new SubmissionError(e);
        });
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        this.props.history.push(`${PREFIXPANEL}/products`);
        notification('success', 'Producto agregado de manera correcta').show();
    }

    renderBody = () => (
        <ProductForm onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleBack}
            categories={this.props.categories} />
    );

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="12" xl="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Nueva Producto</h2>
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

NewProductContainer.defaultProps = {
    categories: [],
    products: [],
    paths: {}
}

const mapStateToProps = state => ({
    auth: state.authentication,
    categories: state.categories,
    products: state.products,
    paths: state.paths
})
const mapDispatchToProps = {
    insertProduct,
    fetchCategories,
    fetchProducts,
    fetchPathProducts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewProductContainer));