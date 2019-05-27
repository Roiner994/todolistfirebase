import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { insertCategory , fetchCategories } from "./../../../actions/categories";
import CategoryForm from "./../../../components/Forms/CategoryForm";
import { notification } from '../../../constants/notification';
import {PREFIXPANEL} from './../../../constants';

class NewCategorieContainer extends Component {

    componentDidMount = () => {
        if(this.props.categories.length <= 0)
            this.props.fetchCategories();
    }    

    handleSubmit = values => {
        return this.props.insertCategory(values).then( r => {
        }).catch( e => {
            throw new SubmissionError(e);
        });
    }
    
    handleBack = () => {
        this.props.history.goBack();
    };
    
    handleOnSubmitSuccess = () => {
        this.props.history.push(`${PREFIXPANEL}/categories`);
        notification('success', 'Categoria agregada de manera correcta').show();
    }

    renderBody = () => (
        <CategoryForm onSubmit={this.handleSubmit}
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
                                    <h2>Nueva Categoria</h2>
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
    categories: state.categories,
})
const mapDispatchToProps = {
    insertCategory,
    fetchCategories
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewCategorieContainer));