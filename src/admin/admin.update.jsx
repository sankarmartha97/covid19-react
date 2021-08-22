import React, { Component, Fragment } from 'react';
import {
    i18n
} from 'element-react';
import 'element-theme-default';
import locale from 'element-react/src/locale/lang/en';
import { Form, Input, Button, MessageBox, Select } from 'element-react';
import AdminStatusUpdate from './admin.status.update';
i18n.use(locale);

export default class AdminUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                district:'',
                populationAsPerElectoralRoll: '',
            },
            rules: {
                district: [
                  {
                    type: 'select',
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change',
                  },
                ],
                populationAsPerElectoralRoll: [
                    {
                      type: 'date',
                      required: true,
                      message: 'Please pick a date',
                      trigger: 'change',
                    },
                  ],
            },
            data: [],
        }
    }

    componentDidMount() {
        // fetch(`${process.env.REACT_APP_URL}/admin/citizen_current`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //         'authorization': localStorage.getItem('id_token'),
        //         // 'key': localStorage.getItem('key'),
        //         // 'reqid': localStorage.getItem('request'),
        //     }
        // })
        // .then((res) => res.json())
        // .then((data) => this.setState({ data }));
        fetch(`${process.env.REACT_APP_URL}/districtlist`)
            .then((res) => res.json())
            .then((data) => this.setState({ data }));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.refs.form.validate((valid) => {
            if (valid) {
                this.updatedata();
            } else {
                // console.log('error submit!!');
                return false;
            }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value }),
        });
        this.setState({ loading: false })
    }

    updatedata() {
        const district = this.state.form.district;
        const populationAsPerElectoralRoll = this.state.form.populationAsPerElectoralRoll || 0;

        fetch(`${process.env.REACT_APP_URL}/admin/citizen_data_new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'authorization': localStorage.getItem('id_token'),
                // 'key': localStorage.getItem('key'),
                // 'reqid': localStorage.getItem('request'),
            },
            body: JSON.stringify({
                district,
                populationAsPerElectoralRoll
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                MessageBox.confirm(`${res.message}`, 'Success', {
                    confirmButtonText: 'OK',
                    type: 'success',
                })
                    .then(() => {
                        window.location.reload(true);
                    })
                    .catch(() => {
                        window.location.reload(true);
                    });
            })

    }

    render() {
        return (
            <Fragment>
                <div className='row dashboard_updation_wrapper'>
                    <div className='col-md-6 col-lg-6 dashboard_updation_form'>
                        <Form
                            ref='form'
                            className='en-US'
                            model={this.state.form}
                            labelWidth='200'
                        >
                            {/* <Form.Item label='Total No.Of FLWs'>
                                    <Input
                                        type='number'
                                        value={this.state.form.flws}
                                        onChange={this.onChange.bind(this, 'flws')}
                                    ></Input>
                                </Form.Item>

                                <Form.Item label='Total No.Of HCWs'>
                                    <Input
                                        type='number'
                                        value={this.state.form.hsws}
                                        onChange={this.onChange.bind(this, 'hsws')}
                                    ></Input>
                                </Form.Item>

                                <Form.Item label='No. of Citizens Between  18 to 44 year'>
                                    <Input
                                        type='number'
                                        value={this.state.form.CitizensBetween18to44}
                                        onChange={this.onChange.bind(this, 'CitizensBetween18to44')}
                                    ></Input>
                                </Form.Item> */}

                            
                            <Form.Item label='Select District' prop='district'>
                                <Select
                                    value={this.state.form.district}
                                    placeholder='District'
                                    onChange={this.onChange.bind(this, 'district')}
                                    clearable={true}
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
                            <Form.Item label='Population as per electoral Roll 'prop = 'populationAsPerElectoralRoll'>
                                <Input
                                    type='number'
                                    value={this.state.form.populationAsPerElectoralRoll}
                                    onChange={this.onChange.bind(this, 'populationAsPerElectoralRoll')}
                                ></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button type='warning' onClick={this.handleSubmit.bind(this)} loading={this.state.loading}>
                                    Submit
                                </Button>
                                {/* <Button onClick={this.handleReset.bind(this)}>Reset</Button> */}
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='col-md-6 col-lg-6 dashboard_current_status'>
                        <AdminStatusUpdate />
                    </div>
                </div>
            </Fragment>
        )
    }

}