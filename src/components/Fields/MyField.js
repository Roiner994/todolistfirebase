import React from 'react';
import { FormGroup, FormText, Label, Input, Col, Row } from "reactstrap";

const MyField = ({ input, meta, type, label, name, placeholder }) => {
    return (
        <div>
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor={input.name}>{label}</Label>
                        <Input {...input} type={!type ? "text" : type} placeholder={placeholder} invalid={meta.touched && meta.error ? true : false} />
                        {
                            meta.touched && meta.error && <FormText type="invalid">{meta.error}</FormText>
                        }
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};


export default MyField;