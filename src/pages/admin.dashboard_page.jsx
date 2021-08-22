import React, { Component, Fragment } from 'react'
import AdminHeaderNav from '../admin/header.component'
import AdminBodyLayout from '../admin/admin.dashbord.body_layout';
import { Loading } from 'element-react';
import AuthService from '../authServices/AuthService';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loading: true
    };

    this.Auth = new AuthService();

  }

  //
  componentDidMount(){
    if (this.Auth.loggedIn()) {
        setTimeout(() => {
          this.setState({loading: false})
        },4000)
    } else {
        this.props.history.replace('/app/login')
    }
  }

  // render main component
  render() {
    return (
      <Fragment>
        {this.state.loading && <Loading fullscreen={true} text="loading..."/>}
            <AdminHeaderNav />
            <AdminBodyLayout/>
      </Fragment>
    )
  }
}
