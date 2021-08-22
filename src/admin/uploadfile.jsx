import React, { Component, Fragment } from 'react';
import {
    Form, Input, DatePicker, Button, Select, MessageBox
} from 'element-react';
import dateFormat from 'dateformat';
import axios from 'axios';
import $ from 'jquery';
import Citizen from './orders.citizen';

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                district: '',
                date: new Date
            },
            rules: {
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' }
                ],
                district: [
                    { required: true, message: 'Please Select district' }
                ],
                date: [
                    { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                ],
            },
            data: [{ "id": 18, "name": "Anjaw" }, { "id": 19, "name": "Changlang" }, { "id": 15, "name": "Dibang Valley" }, { "id": 14, "name": "East Kameng" }, { "id": 1, "name": "East Siang" }, { "id": 26, "name": "Itanagar Capital C" }, { "id": 25, "name": "Kamle" }, { "id": 2, "name": "Kra Daadi" }, { "id": 3, "name": "Kurung Kumey" }, { "id": 8, "name": "Leparada" }, { "id": 17, "name": "Lohit" }, { "id": 20, "name": "Longding" }, { "id": 16, "name": "Lower Dibang Valley" }, { "id": 7, "name": "Lower Siang" }, { "id": 4, "name": "Lower Subansiri" }, { "id": 22, "name": "Namsai" }, { "id": 24, "name": "Pakke Kessang" }, { "id": 23, "name": "Papumpare" }, { "id": 10, "name": "Shi Yomi" }, { "id": 11, "name": "Siang" }, { "id": 12, "name": "Tawang" }, { "id": 21, "name": "Tirap" }, { "id": 5, "name": "Upper Siang" }, { "id": 6, "name": "Upper Subansiri" }, { "id": 13, "name": "West Kameng" }, { "id": 9, "name": "West Siang" }],
            selectedFile: null
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
        formData.set("district", this.state.form.district);

        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object
        const res = await axios.post(`${process.env.REACT_APP_URL}/admin/pdf`, formData);
        console.log(res)
        if (res.data.success) {
            MessageBox.alert(`${res.data.message}`, 'Success', {
                confirmButtonText: 'OK',
                type: 'success',
            })
        } else {
            MessageBox.alert(`${res.data.message}`, 'Error', {
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
        const { date } = this.state
        return (
            <Fragment>
                <div className='row dashboard_updation_wrapper'>
                    <div className='col-md-6 col-lg-6 dashboard_updation_form'>
                        <h6>Gov. Orders For District</h6>
                        <br></br>
                        <Form ref="form" className="en-US" model={this.state.form} rules={this.state.rules} labelWidth="120">
                            <Form.Item label="Name" prop="name">
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>

                            <Form.Item label='Select District' required={true} prop='district'>
                                <Select
                                    value={this.state.form.district}
                                    placeholder='District'
                                    onChange={this.onChange.bind(this, 'district')}
                                    clearable={true}
                                    multiple={true}
                                >
                                    {this.state.data.map((el) => {
                                        return (
                                            <Select.Option
                                                key={el.id}
                                                label={el.name}
                                                value={el.id}
                                            />
                                        );
                                    })}
                                </Select>
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
                                <input type="file" accept="application/pdf" onChange={this.onFileChange}>
                                </input>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.onFileUpload}><i className="el-icon-upload el-icon-right"></i>  Upload</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='col-md-6 col-lg-6 dashboard_updation_form'>
                       <Citizen />
                    </div>
                </div>
            </Fragment>
        )
    }
}
