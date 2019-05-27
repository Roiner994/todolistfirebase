import React from 'react';
import { Form, Button, ButtonToolbar} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import { Prompt } from "react-router-dom";
import MyField from "../Fields/MyField";
import SelectField from "../Fields/SelectField";
import { isRequired, isRequiredSelect, isNumber, toNumber } from "../../constants/validation";
import { OPTION_SELECT_FIELD, NOT_IMAGE } from "../../constants";
import PropTypes from 'prop-types';
import { urlServer } from './../../api/urls'
import ImageField from './../Fields/ImageField';


const ProductForm = ({
    handleSubmit, submitting, onBack, pristine, submitSucceeded, isEdit, categories, pathPublic, image
}) => {
    const pathImage = image ? 
                        `${urlServer}${pathPublic.path}${image}` : 
                        `${urlServer}${NOT_IMAGE}`
    return (
        <Form onSubmit={handleSubmit} className="product-form">
            <Field
                name="name"
                component={MyField}
                type="text"
                validate={isRequired}
                label="Nombre"
                placeholder="Nombre"
            />

            <Field
                name="cant"
                component={MyField}
                type="number"
                validate={[isNumber, isRequired]}
                label="Cantidad"
                parse={toNumber}
            />

            <Field
                name="price"
                component={MyField}
                type="number"
                validate={[isNumber, isRequired]}
                label="Precio"
                parse={toNumber}
            />

            <Field
                name="category_id"
                component={SelectField}
                label="Categoria"
                validate={isRequiredSelect}
            >
                <option>{OPTION_SELECT_FIELD}</option>
                {categories.map(category =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                )};
            </Field>

            <Field
                name="image"
                component={ImageField}
                type="file"
                label="Imagen"
                path={pathImage}
            />

            <ButtonToolbar className="float-right">
                <Button color="primary" type="submit" disabled={pristine || submitting}>
                    Aceptar
                </Button>
                &nbsp;
                <Button color="warning" type="button" disabled={submitting} onClick={onBack}>
                    Cancelar
                </Button>
            </ButtonToolbar>
            <Prompt
                when={!pristine && !submitSucceeded}
                message="Se perderan los datos si continua"></Prompt>
        </Form>
    );
};

ProductForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};

const ProductFormRedux = reduxForm({ form: "ProductForm" })(ProductForm);
export default setPropsAsInitial(ProductFormRedux);