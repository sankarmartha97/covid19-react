import React,{Fragment} from 'react';
import AdminHeaderMenu from './header_menu.component';
import AdminHeaderTitle from './header_title.component';

const AdminHeaderNav = () =>{
    // render main component 
    return(
        <Fragment>
            <div className="container-fluid header_nav">
            <div className="row">
                <div className="col-6">
                    <AdminHeaderTitle />
                </div>
                <div className="col-6 text-right">
                    <AdminHeaderMenu />
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default AdminHeaderNav