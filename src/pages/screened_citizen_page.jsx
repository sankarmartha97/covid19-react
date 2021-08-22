import React, { Component, Fragment} from 'react'
import AdminHeaderNav from '../admin/header.component'
// import ScreendCitizen from '../admin/screened_citizen.component'
import AdminPage from '../admin/admin.layout';
import AuthService from '../authServices/AuthService';
import withAuth from '../authServices/withAuth';
import { Loading } from 'element-react';
const Auth = new AuthService();

class AdminScreenedCitizen extends Component {
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
      <Fragment>
        {/* {this.state.loading && <Loading fullscreen="true" text="loading..." />} */}
        <div className='admin_wrapper'>
          <AdminHeaderNav />
          <div className='container'>
            {/* <ScreendCitizen /> */}
            <AdminPage/>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(AdminScreenedCitizen);
