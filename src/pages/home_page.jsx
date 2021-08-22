import React, { Component, Fragment } from 'react'
import HeaderNav from '../components/header.component';
// import BodyLayout from '../components/body_layout.component';
import { Loading } from 'element-react';

import New_dashboard from '../components/new_dashboard.component'
export default class HomePage extends Component {
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
    },4000)
  }

  // render main component
  render() {
    return (
      <Fragment>
        {this.state.loading && <Loading fullscreen={true} text="loading..."/>}
            <HeaderNav />
            {// <BodyLayout />
            }
            <New_dashboard/>

      </Fragment>
    )
  }
}
