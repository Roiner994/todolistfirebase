import React from 'react';
import {Form , Button, ButtonToolbar} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import {Prompt} from "react-router-dom";
import MyField from "../Fields/MyField";
import {isRequired} from "../../constants/validation";
import PropTypes from 'prop-types';

const TodoForm = ({handleSubmit, submitting, onBack, pristine, submitSucceeded, isEdit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field 
                name="text" 
                component={MyField} 
                type="text" 
                validate={isRequired} 
                label="Tarea"
                placeholder= "Tarea"
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

TodoForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};


const TodoFormRedux = reduxForm({ form: "TodoForm" })(TodoForm);
export default setPropsAsInitial (TodoFormRedux);