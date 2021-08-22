import React, { Component, Fragment} from 'react'
import AdminHeaderNav from '../admin/header.component'
import AuthService from '../authServices/AuthService';
import withAuth from '../authServices/withAuth';
import DashboardUpdateLayout from '../admin/dashboardupdatelayout';
import { Loading } from 'element-react';
const Auth = new AuthService();

class AdminDashboardUpdate extends Component {
  constructor(props){
    super(props);
    this.state ={
      loading: true
    }
  }


  //
  componentDidMount(){
    setTimeout(() =>{
      this.setState({loading: false})
    },500)
  }

  //render main component
  render() {
    return (
      <Fragment>
        {/* {this.state.loading && <Loading  fullscreen="true" text="loading..." />} */}
        <div className='admin_wrapper'>
          <AdminHeaderNav />
          <DashboardUpdateLayout />
        </div>
      </Fragment>
    );
  }
}

export default withAuth(AdminDashboardUpdate);
