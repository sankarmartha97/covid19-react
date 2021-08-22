import React, { Component, Fragment } from 'react';
import HeaderTitle from './header_title.component';
import HeaderMenu from './header_menu.component';

export default class HeaderNav extends Component {
render() {
    return (
      <Fragment>
        <div className="container-fluid header_nav">
            <div className="row">
                <div className="col-7">
                    <HeaderTitle />
                </div>
                <div className="col-5 text-right">
                    <HeaderMenu />
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
  
  
}
