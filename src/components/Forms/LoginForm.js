import React from 'react';
import {Form , Button, ButtonToolbar} from "reactstrap";
import { reduxForm } from "redux-form";
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import {Prompt} from "react-router-dom";
import PropTypes from 'prop-types';

const LoginForm = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <ButtonToolbar className="float-right">
                <Button color="danger" type="submit" disabled={submitting}>
                    Google <i className="fa fa-google"></i>
                </Button>
                &nbsp;
            </ButtonToolbar>
            <Prompt
                        when={!pristine && !submitSucceeded}
                        message="Se perderan los datos si continua"></Prompt>
        </Form>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};

const LoginFormRedux = reduxForm({ form: "LoginForm" })(LoginForm);
export default setPropsAsInitial (LoginFormRedux);