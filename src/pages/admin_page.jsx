import React, { Component} from 'react'
import { Loading } from 'element-react';
import AdminHeaderNav from '../admin/header.component'
import AdminBodyLayout from '../admin/adminbodylayout';
import AuthService from '../authServices/AuthService';
import withAuth from '../authServices/withAuth';

const Auth = new AuthService();

class AdminPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loading: true
    }
  }

  // 
  componentDidMount(){
    setTimeout(() => {
      this.setState({loading: false})
    },500)
  }


  //render main component
  render() {
    return (
      <div className="admin_wrapper">
        {/* {this.state.loading && <Loading fullscreen={true} text="loading..."/>} */}
        <AdminHeaderNav />
        <AdminBodyLayout />
      </div>
    )
  }
}

export default withAuth(AdminPage);
