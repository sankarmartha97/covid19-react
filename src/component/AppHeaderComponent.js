
import React, {Fragment} from 'react'

export default function AppHeaderComponent() {
    return (
        <Fragment>
            <div className="app-header-wrapper">
            <div className="row inside-wrapper">
                <div className="col-md-9 header-left">
                    <div className="logo">
                        <img src="image/logo.png" alt="LOGO" draggable="false" />
                    </div>
                    <div className="header-title-wrapper">
                        <div className="big-title">State Control Room</div>
                        <div className="small-title">Government of Arunachal Pradesh</div>
                    </div>
                </div>
                <div className="col-md-3 col-xs-12 header-right">
                    <img src="image/india-logo.png" alt="India Logo" />
                </div>
            </div>
            </div>
        </Fragment>
    )
}
