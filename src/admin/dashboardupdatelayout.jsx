import React, { Component, Fragment } from 'react'
import{
  Tabs,
} from 'element-react'
import 'element-theme-default';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import DashboardUpdation from './dashboardupdation.component';
import DistrictReportView from './district.covidReportView';
i18n.use(locale);

export default class DashboardUpdateLayout extends Component {

  // return main component 
  render() {
    const dashboard_updation = <span><i class="fas fa-pen tab_ico"></i>Update COVID-19 Report</span>
    const report_view = <span><i class="fas fa-eye tab_ico"></i>View COVID-19 Report</span>
    return (
      <Fragment>
        <div className='container mobile_app_user_wrapper'>
            <Tabs
              activeName='1'
              onTabClick={tab => console.log(tab.props.name)}
            >
              <Tabs.Pane label={dashboard_updation} name='1'>
                  <DashboardUpdation />
              </Tabs.Pane>
              <Tabs.Pane label={report_view} name='2'>
                  <DistrictReportView />
              </Tabs.Pane>
            </Tabs>
        </div>
      </Fragment>
    );
  }
}
