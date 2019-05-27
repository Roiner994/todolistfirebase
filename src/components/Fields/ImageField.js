import React, { Component } from 'react';
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import "./ImageField.css";

export default class ImageField extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            path: this.props.path,
        }
    }

    onChange(e) {
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0]);
        this.setState({
            path: URL.createObjectURL(e.target.files[0])
        })
    }

    render() {
        const { input, label } = this.props  //whatever props you send to the component from redux-form Field
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor={input.name}>{label}</Label>
                            <br/>
                            <img src={this.state.path} alt="" className="img-field"/>
                            <br/>
                            <Input
                                type='file'
                                accept='.jpg, .png, .jpeg'
                                onChange={this.onChange}
                                name='image'
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}