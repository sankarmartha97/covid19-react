import React, { Component, Fragment } from 'react';
import {
    Tabs,
    i18n
} from 'element-react';
import 'element-theme-default';
import locale from 'element-react/src/locale/lang/en';
import ScreendCitizen from './screened_citizen.component';
import CitienData from './admin.update';
import ApprovedReport from './approvedReport';
import Upload from './uploadfile';
import DataReport from './dataReport';
// import Test from '../pages/admin.dashboard_page';
// import Test from '../admin/admin.dashbord.body_layout';
import SuperAdmin from './superAdmin';

i18n.use(locale);


export default class AdminLayout extends Component {
    render() {
        const dataReport = <span><i class="fas fa-pen tab_ico"></i>Reports</span>
        const dataVerify = <span><i class="fas fa-pen tab_ico"></i>District Reports</span>
        const insertCitizen = <span><i class="fas fa-eye tab_ico"></i>Admin Data Entry</span>
        const approvrd_report_lable = <span><i class="fas fa-mobile-alt tab_ico"></i>Approved Reports</span>
        const orders_lable = <span><i class="fas fa-clipboard tab_ico"></i>Orders</span>
        const superadmin_lable = <span><i class="fas fa-clipboard tab_ico"></i>Super Admin</span>


        return (
            <Fragment>
                <div className='container mobile_app_user_wrapper'>
                    <Tabs
                        activeName={localStorage.getItem('access_tab')}
                        onTabClick={tab => localStorage.setItem('access_tab', tab.props.name)}
                    >
                        <Tabs.Pane label={dataVerify} name='1'>
                            <ScreendCitizen />
                        </Tabs.Pane>
                        <Tabs.Pane label={insertCitizen} name='2'>
                            {/* <DashboardUpdatedReport /> */}
                            <CitienData />
                        </Tabs.Pane>
                        <Tabs.Pane label={approvrd_report_lable} name='3'>
                            <ApprovedReport />
                        </Tabs.Pane>
                        <Tabs.Pane label={orders_lable} name='4'>
                            <Upload />
                        </Tabs.Pane>    
                        <Tabs.Pane label={dataReport} name='5'>
                            <DataReport/>
                        </Tabs.Pane>    

                        <Tabs.Pane label={superadmin_lable} name='6'>
                            {/* <Test /> */}
                            <SuperAdmin />
                        </Tabs.Pane>  
                    </Tabs>
                </div>
            </Fragment>
        )
    }
}