import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row , Spinner} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fetchCategories, updateCategory } from './../../../actions/categories';
import {notification} from "./../../../constants/notification";
import { getCategories, getCategoryById } from './../../../selectors/categories';
import CategoryForm from './../../../components/Forms/CategoryForm';

class CategoryContainer extends Component {
    componentDidMount = () => {
        if(this.props.categories.length <= 0)
            this.props.fetchCategories();
    }

    renderBody = () => {
        if (this.props.category){
            return <CategoryForm {...this.props.category}
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
        return this.props.updateCategory(id, values).then( r => {
        }).catch(e => {
            throw new SubmissionError(e);
        });
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        notification( 'success', 'Categoria actializado correctamente' ).show();
        this.props.history.goBack();
    }

    handleOnSubmitFail = (e) => {
        notification( 'error', e ).show();
    }

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" lg="12" xl="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h2>Editar Categoria</h2>
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


CategoryContainer.proTypes = {
    id: PropTypes.number.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    category: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    auth: state.authentication,
    categories : getCategories(state),
    category: getCategoryById(state,props)
})

const mapDispatchToProps ={
    fetchCategories, 
    updateCategory
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (CategoryContainer));