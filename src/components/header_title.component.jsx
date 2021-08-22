import React from 'react'

const HeaderTitle = () =>{
    return(
        <div className="header_back">
            <img src="/img/logo.png" alt="" className="app_logo"/>
            {/* <span className="app_title_app_name">
            STATE COVID CONTROL ROOM
            </span> */}
            <span className="app_title_app_name">
            State Control Room
            </span>
            {/* <span className="app_title">
            GOVERNMENT OF ARUNACHAL PRADESH
            </span> */}
            <span className="app_title">
            Government of Arunachal Pradesh
            </span>

            <span className="mobile_menu_title d-md-none d-lg-none">
                SCCR
            </span>
        </div>
    )
}

export default HeaderTitle