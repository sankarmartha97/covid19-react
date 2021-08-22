import React,{ Fragment } from 'react'

export default function Footer() {
    return (
      <Fragment>
        <div className="footer-wrapper">
          <div className="inside-wrapper">
            <div className="row">
              <div className="col-md-6 footer-left">
                <div className="title">Contact Us</div>
                <div className="contact-details-01">State Control Room</div>
                <div className="contact-details-02">
                  Civil Secretariat, Itanagar - 791111
                </div>
              </div>
              <div className="col-md-6 footer-right">
                <div className="contact-details-01">
                  <i class="fas fa-envelope"></i>
                  infoccritanagar@gmail.com
                </div>
                <div className="contact-details-02">
                  <i class="fas fa-phone-alt"></i>
                    Helpdesk Number +91 603 385 6466
                </div>
              </div>
            </div>
            <div className="bottom-line mt-3 mb-3"></div>
            <div className="footer-wide-content">
              <div className="content-01">
                Contents of this website is published and managed by STATE
                CONTROL ROOM, Government of Arunachal Pradesh, India. For any
                queries regarding this website please contact Web Information
                Manager
              </div>
              <div className="content-02">
              © State Control Room, Government of Arunachal Pradesh, India.
              </div>
              <div className="content-03">
              Site best viewed at 1024 x 768 resolution in Internet Explorer 10+, Google Chrome 49+, Firefox 45+ and Safari 6+
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}
