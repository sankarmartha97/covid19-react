import React, { Component, Fragment } from 'react';
import {
    Form, Input, DatePicker, Button, MessageBox
} from 'element-react';
import dateFormat from 'dateformat';
import axios from 'axios';
import $ from 'jquery'
export default class Citizen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                date: new Date
            },
            rules: {
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                ],
            },
        }
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = async () => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append(
            "myfile",
            this.state.selectedFile,
        );
        formData.set("date", dateFormat(this.state.form.date, "isoDate"));
        formData.set("name", this.state.form.name);
        formData.set("district", 'null');

        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object
        const res = await axios.post(`${process.env.REACT_APP_URL}/admin/pdf`, formData);
        // MessageBox.confirm(`${res.data.message}`, 'Success', {
        //     confirmButtonText: 'OK',
        //     cancelButtonText: 'Cancel',
        //     type: 'success',
        // })
        if (res.data.success) {
            MessageBox.alert(`${res.data.message}`+ ' For Citizen.', 'Success', {
                confirmButtonText: 'OK',
                type: 'success',
            })
        } else {
            MessageBox.alert(`${res.data.message}` +' While uploading Citizen Order.', 'Error', {
                confirmButtonText: 'OK',
                type: 'error',
            })
        
        }
        this.setState({
            form: Object.assign({}, this.state.form, { name: null, date: new Date,  })
        });
        $("#fileControl").val('');
    };

    render() {
        const { date } = this.state;
        return (
            <Fragment>
                <h6>Gov. Orders For Citizen</h6>
                <br></br>
                <Form ref="form" className="en-US" model={this.state.form} rules={this.state.rules} labelWidth="120">
                    <Form.Item label="Name" prop="name">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="Date" required={true}>
                        <DatePicker
                            value={date}
                            placeholder="Pick a date"
                            onChange={date => {
                                // console.debug('DatePicker1 changed: ', date)
                                this.onChange.bind(this, 'date')
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Select File" required={true}>
                        <input type="file" id="fileControl" accept="application/pdf" onChange={this.onFileChange}>
                        </input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.onFileUpload}><i className="el-icon-upload el-icon-right"></i> Upload</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

