import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './style.scss';
import HomePage from './pages/home_page';
import AdminLogin from './pages/admin_login';
import AdminPage from './pages/admin_page';
import AdminDashboardUpdate from './pages/dashboard_update_page';
import AdminScreenedCitizen from './pages/screened_citizen_page';

import WebSitePage from './view/HomePage';
import AboutUsPage from './view/AboutUsPage';
import RegisterGrievancePage from './view/RegisterGrievancePage';

import  MyDocument from './components/pdfGenerate/index';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={WebSitePage} />
        <Route exact path ="/about" component={AboutUsPage} />
        <Route exact path ="/grievance" component={RegisterGrievancePage} />
        <Route exact path ="/app/dashboard" component={HomePage} />
        <Route path="/app/login" component={AdminLogin} />
        <Route path="/app/admin" component={AdminPage} />
        <Route path="/app/dashboard/update" component={AdminDashboardUpdate} />
        <Route path="/app/dashboard/admin" component={AdminScreenedCitizen} />
        <Route exact path="/doc/:id" component={MyDocument} />
      </Switch>
    </BrowserRouter>
  )
};

export default App;
