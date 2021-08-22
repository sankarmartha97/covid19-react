import React, { Component, Fragment } from 'react'
import MobileUserList from './mobileuserlist.component';
import{
  Tabs,
} from 'element-react'
import 'element-theme-default';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import ApplicationUserList from './applicationuser.component';
i18n.use(locale);

export default class AdminBodyLayout extends Component {

  // return main component 
  render() {
    const registration_req_label = <span><i class="fas fa-user-plus tab_ico"></i>Registration Request</span>
    const application_user_lable = <span><i class="fas fa-mobile-alt tab_ico"></i>Application User</span>
    return (
      <Fragment>
        <div className='container mobile_app_user_wrapper'>
            <Tabs
              activeName='1'
              onTabClick={tab => console.log(tab.props.name)}
            >
            <Tabs.Pane label={registration_req_label} name='1'>
                  <MobileUserList />
              </Tabs.Pane>
              <Tabs.Pane label={application_user_lable} name='2'>
                  <ApplicationUserList />
              </Tabs.Pane>
            </Tabs>
        </div>
      </Fragment>
    );
  }
}
