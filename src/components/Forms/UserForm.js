import React from 'react';
import {Form , Button, ButtonToolbar} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import {Prompt} from "react-router-dom";
import MyField from "../Fields/MyField";
import {isRequired} from "../../constants/validation";
import PropTypes from 'prop-types';

const UserForm = ({handleSubmit, submitting, onBack, pristine, submitSucceeded, isEdit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field 
                name="name" 
                component={MyField} 
                type="text" 
                validate={isRequired} 
                label="Nombre"
                placeholder= "Nombre"
            />
            <Field 
                name="email" 
                component={MyField} 
                type="email" 
                validate={isRequired} 
                label="Correo"
                placeholder= "Correo"
            />
            <Field 
                name="password" 
                component={MyField} 
                type="password" 
                validate={!isEdit ? [isRequired] : []} 
                label="Contraseña"
                placeholder= "Contraseña"
            />

            <ButtonToolbar className="float-right">
                <Button color="primary" type="submit" disabled={(!isEdit && pristine) || submitting}>
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

UserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};


const UserFormRedux = reduxForm({ form: "UserForm" })(UserForm);
export default setPropsAsInitial (UserFormRedux);