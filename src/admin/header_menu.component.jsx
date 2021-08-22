import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import {
  Menu,
} from 'element-react'
import 'element-theme-default';
import AuthService from '../authServices/AuthService';
import { formatDistance } from 'date-fns';
import { Button } from 'element-react';
import { formatDate } from '../common-functions';
const Auth = new AuthService();



export default class AdminHeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: '',
      totalhits: '5'
    }
  }
  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_URL}/status/lastUpdated`)
      .then(res => res.json())
      .then(lastUpdated => this.setState({ lastUpdated: lastUpdated[0] }));
    await fetch(`${process.env.REACT_APP_URL}/visitors/totalvisiter/adm`)
      .then(res => res.json())
      .then(totalhits => this.setState({ totalhits: totalhits[0] }));
  }
  handleLogout() {
    Auth.logout()
  }

  render() {
    return (
      <Fragment>
        <Menu
          theme='dark'
          defaultActive='1'
          className='el-menu-demo'
          mode='horizontal'
          onSelect={this.onSelect.bind(this)}
        >
          <span className='last_updated_status' style={{ 'margin-left': '6px'}}>
            Last Updated:&nbsp;
            {isNaN(Date.parse(formatDate(this.state.lastUpdated)))
              ? ''
              : formatDistance(
                new Date(formatDate(this.state.lastUpdated)),
                new Date()
              ) + ' ago'}
          </span>
          <span className='visitor_count'>Visitors : {this.state.totalhits.count}</span>
          {/* <Menu.SubMenu
                index='3'
                title={
                  <span>
                    <i className='fas fa-user el_menu_ico'></i>
                  </span>
                }
              >
                <Menu.Item index='3-1'>
                  <Link to='/' onClick={this.handleLogout.bind(this)}>
                    Admin Logout
                  </Link>
                </Menu.Item>
              </Menu.SubMenu> */}

          <Menu.SubMenu
            index='2'
            title={
              <span>
                <i className='el-icon-menu el_menu_ico'></i>
              </span>
            }
            style={{ 'margin-left': '6px'}}
          >
            <Menu.Item index='2-1'>
              <Link to='/app/dashboard'>Dashboard</Link>
            </Menu.Item>
            {/* <Menu.Item index='2-2'>
              <Link to='/app/dashboard/citizen'>
                Citizen Screened Report
                </Link>
            </Menu.Item>
            <Menu.Item index='2-3'>
              <Link to='/app/dashboard/update'>
                Update Dashboard Report
                </Link>
            </Menu.Item> */}
            <Menu.Item index='2-4'>
              <Link to='/app/login' onClick={this.handleLogout.bind(this)}>
                Logout
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Fragment>
    );
  }
  onSelect() {

  }
}
