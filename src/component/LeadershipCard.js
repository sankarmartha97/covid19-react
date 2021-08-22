import React,{ Fragment } from 'react'

export default function LeadershipCard() {
    return (
        <Fragment>
            <div className="leadership-card-wrapper">
                <div className="row leadership-row">
                    <div className="col-sm-6 leadership-image-wrapper">
                        <img src="image/leader-img-01.png" alt="Leader" />
                    </div>
                    <div className="col-sm-6 leadership-names-wrapper">
                        <div className="gray-title">Hon’ble Governor</div>
                        <div className="bold-name-title">Brigadier (Dr.) <br/>B.D.Mishra (Retd)</div>
                    {/* <div className="view-profile">View Profile<i class="fas fa-angle-double-right"></i></div>*/}
                    </div>
                </div>
                <div className="row leadership-row">
                    <div className="col-sm-6 leadership-image-wrapper">
                        <img src="image/leader-img-02.png" alt="Leader" />
                    </div>
                    <div className="col-sm-6 leadership-names-wrapper">
                        <div className="gray-title">Hon’ble Chief Minister</div>
                        <div className="bold-name-title">Shri Pema Khandu</div>
                       {/* <div className="view-profile">View Profile<i class="fas fa-angle-double-right"></i></div>*/}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
