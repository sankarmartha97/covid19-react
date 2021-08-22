import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import{
  Form,
  Input,
  Button,
  MessageBox
} from 'element-react';
import AuthService from '../authServices/AuthService';


export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    
    //state 
    this.state = {
      loading: false,
      form: {
        email: '',
        pass:''
      },
      rules: {
        email: [
          { required: true, message: 'Please input UserName', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ]
      }
    };
    //end of state def

    this.Auth = new AuthService();
  }
  //end of constructor def


  // 
  componentWillMount() {
    console.log(this.props.history);
    if (this.Auth.loggedIn())
    if(localStorage.getItem('type')== 'admin'|| localStorage.getItem('request')==0){
      this.props.history.replace('/app/dashboard/admin');
    } else {
      this.props.history.replace('/app/dashboard/update')
    }
  } 
  

  //
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    this.refs.form.validate((valid) => {
      if (valid) {
        const userName = this.state.form.email;
        const userPassword = this.state.form.pass;
        this.Auth.login(userName, userPassword)
            .then(res => {
              MessageBox.alert(`${res.message}`, 'Success', {
                type: 'success'
              }).then(() => {
                if(res.type=='admin' || res.requestId==0){
                  this.props.history.replace('/app/dashboard/admin');    
                } else {
                  this.props.history.replace('/app/dashboard/update');
                }
              })
            })
            .catch(res => {
              MessageBox.alert(`${res.message}`, 'Warning', {
                type: 'warning'
              }).then(() => {
                this.setState({loading:false})
              })
             
            })
      } else {
        return false;
      }
    });
  }
  

  //
  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields();
  }
  
  //
  onEmailChange(value) {
    this.setState({
      form: Object.assign({}, this.state.form, { email: value })
    });
    this.setState({loading:false});
  }


  //
  onPasswordChange(value) {
    this.setState({
      form: Object.assign({}, this.state.form, { pass: value })
    });
    this.setState({loading:false});
  }





  // render main component
  render() {
    const {loading} = this.state;
    return (
      <Fragment>
        <div className='container-fluid login_wrapper'>
          <div className='login_body'>
            <div className='login_header'>
              <img src='/img/logo.png' alt='' className='login_logo_image' />
              <div className='login_title'>
                <p className='login_inner_title'>
                  <span className='covid_title'>Covid-19</span>&nbsp;Admin Login
                </p>
              </div>
            </div>
            <div className='login_form'>
              <Form
                ref='form'
                model={this.state.form}
                rules={this.state.rules}
                labelWidth='100'
                className='demo-ruleForm'
              >
                <Form.Item prop='email' label='User Name'>
                  <Input
                    value={this.state.form.email}
                    onChange={this.onEmailChange.bind(this)}
                  ></Input>
                </Form.Item>

                <Form.Item label='Password' prop='pass'>
                  <Input
                    type='password'
                    value={this.state.form.pass}
                    onChange={this.onPasswordChange.bind(this)}
                  ></Input>
                </Form.Item>

                <Form.Item>
                  {/* <Button onClick={this.handleReset.bind(this)}>Reset</Button> */}
                  {/* <Link to='/'> */}
                  <Link to='/app/dashboard'>
                    <Button className="mr-3 mb-3">
                      <i class='fas fa-arrow-left'></i> Back to Dashboard
                    </Button>
                  </Link>

                  <Button type='primary' onClick={this.handleSubmit.bind(this)} loading={loading}>
                    {/* {loading && <i class="fas fa-spinner fa-spin"></i>}
                    {loading && <span>&nbsp;Loading</span>}
                    {!loading && <span>&nbsp;Login</span> } */}
                    Login
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
