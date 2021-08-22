import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import{
  Menu,
} from 'element-react'
import 'element-theme-default';
import {formatDistance} from 'date-fns';
import {formatDate} from '../common-functions';
// var lastupdatedtime= "2020-03-30 10:00:48";


export default class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated:'',
      totalhits:''
    }
  }
  async componentDidMount(){
    await fetch(`${process.env.REACT_APP_URL}/status/lastUpdated`)
      .then(res => res.json())
      .then(lastUpdated => this.setState({ lastUpdated :lastUpdated[0]},localStorage.setItem('last',lastUpdated[0]),sessionStorage.setItem('last',lastUpdated[0]), localStorage.setItem('lastDataDate', lastUpdated[1])));
    await fetch(`${process.env.REACT_APP_URL}/visitors/totalvisiter`)
    .then(res => res.json())
    .then(totalhits => this.setState({ totalhits :totalhits[0]}));
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
          
           <span className="last_updated_status">Last Updated:&nbsp; 
            {isNaN(Date.parse(formatDate(this.state.lastUpdated)))
              ? ''
              : formatDistance(
                new Date(formatDate(this.state.lastUpdated)),
                new Date()
              ) + ' Ago'}
          </span>
         <span className="visitor_count">
            Visitors : {this.state.totalhits.count}
           </span> 
          <Menu.SubMenu
            index='2'
            title={
              <span>
                <i className='el-icon-menu el_menu_ico'></i>
              </span>
            }
          >
            <Menu.Item index='2-1'>
              <Link to="/app/login">Login</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Fragment>
    )
  }
  onSelect() {
  
  }
}


