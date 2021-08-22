import React, { Fragment } from 'react'

export default function NewsAndMedia() {
    return (
        <Fragment>
            <div className="news-media-wrapper">
              <div className="row helpline-wrapper">
                  <div className="left">Police</div>
                  <div className="right">
                  <i class="fas fa-phone-alt"></i>100
                  </div>
              </div>
              {/*  */}
              <div className="row helpline-wrapper">
                  <div className="left">Fire</div>
                  <div className="right">
                  <i class="fas fa-phone-alt"></i>101
                  </div>
              </div>
              {/*  */}
              <div className="row helpline-wrapper">
                  <div className="left">Ambulance</div>
                  <div className="right">
                  <i class="fas fa-phone-alt"></i>108
                  </div>
              </div>
              {/*  */}
              <div className="row helpline-wrapper">
                  <div className="left">Child Helpline</div>
                  <div className="right">
                  <i class="fas fa-phone-alt"></i>1098
                  </div>
              </div>
              {/*  */}
              <div className="row helpline-wrapper">
                  <div className="left">Itanagar District Helpline</div>
                  <div className="right">
                  <i class="fas fa-phone-alt"></i>1090
                  </div>
              </div>
            </div>
        </Fragment>
    )
}
