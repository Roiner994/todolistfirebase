import React from 'react';
import { FormGroup, FormText, Label, Input, Col, Row } from "reactstrap";

const SelectField = ({ input, meta, label, placeholder, children, custom }) => {
    return (
        <div>
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor={input.name}>{label}</Label>
                        <Input 
                        {...input}
                        {...custom}
                        type="select" 
                        placeholder={placeholder} 
                        invalid={meta.touched && meta.error ? true: false} >
                                {children}
                        </Input>
                        {
                            meta.touched && meta.error && <FormText type="invalid">{meta.error}</FormText>
                        }
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};


export default SelectField;