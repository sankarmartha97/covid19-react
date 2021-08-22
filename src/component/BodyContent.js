import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ImportantLink from "./ImportantLink";
import LeadershipCard from "./LeadershipCard";
import NewsAndMedia from "./NewsAndMedia";
import NoticeBoardTab from "./NoticeBoardTab";

export default function BodyContent() {
  function covidDashboardLink() {
    window.location.href = "/app/dashboard"
  }

  function districtControlRoomsLink() {
    window.location.href ="./image/DIST-CONTROL.pdf"
  }
  function deputyCommissionerLink(){
    window.location.href ="./image/DC-SP-List.pdf"
  }
  function covidFacilitiesLink(){
    window.open("./image/Distwise_COVID_facilities_contact_no.pdf","_blank")
  }
  
  function vaccineRegistrationLink() {
    window.open("https://www.cowin.gov.in/","_blank")
  }

  return (
    <Fragment>
      <div className="body-content-wrapper">
        <div className="inside-wrapper">
          <div className="row">
            <div className="col-md-3">
              <div className="main-link-wrapper">
                <div className="link-box color-01" onClick={covidDashboardLink}>
                  Covid-19 Dashboard
                  <span className="right-icon">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
                <div className="link-box color-02" onClick = {covidFacilitiesLink}>
                  Covid-19 Facilities
                  <span className="right-icon">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
                <div className="link-box color-03" onClick={vaccineRegistrationLink}>
                  Register for Vaccination
                  <span className="right-icon">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="notice-board-wrapper">
                <div className="notice-board-title">Notice Board</div>
                {/* import notice board tab section */}
                <NoticeBoardTab />
              </div>
            </div>
            <div className="col-md-3">
              <div className="leadership-wrapper">
                <div className="leadership-title">Leadership</div>
                {/* import leadership card section */}
                <LeadershipCard />
              </div>
            </div>
          </div>

          {/* body card section */}
          <div className="row mt-3">
            <div className="col-md-9 pr-30 body-content-wrapper">
              {/* First contact card row */}
              <div className="row">
                <div className="col-sm-6 body-content-card pr-15">
                  <div className="card">
                    <div className="icon">
                      {/* <i class="fas fa-headphones"></i> */}
                      <img src="image/Headphone.svg" alt="Headphone"  draggable="false" />
                    </div>
                    <div className="body-content-card-inner-div-2" >
                      <div className="title">District Covid-19 Control Rooms</div>
                      <div className="link" onClick={districtControlRoomsLink}>
                        List of District Control Room Phone Numbers
                        <i class="fas fa-angle-double-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 body-content-card pl-15">
                  <div className="card">
                    <div className="icon">
                      <img src="image/Deputy-header.svg" alt="Deputy" draggable="false" />
                    </div>
                    <div className="body-content-card-inner-div-2" >
                        <div className="title">
                          Deputy Commissioners & <br/>Superintendents of Police
                        </div>
                        <div className="link" onClick={deputyCommissionerLink}>
                          List of Phone Numbers
                          <i class="fas fa-angle-double-right"></i>
                        </div>
                    </div>
                     </div>
                </div>
              </div>
              {/* EOF First contact card */}

              {/* Second contact card row */}
              <div className="row">
                <div className="col-sm-6 contact-card pr-15">
                  <div className="card contact-card-1">
                    <div className="card-header card-header-01">
                      State Disaster Response Force [SDRF]
                    </div>
                    <div className="card-body card-body-01 contact-card-body">
                      <div className="card-inside-row">
                        <div className="text">TOLL-FREE Number </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>1070
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">Commandant </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>094 36 22 3301
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">Deputy Commandant </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>094 85 23 1910
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 contact-card pl-15">
                  <div className="card contact-card-2">
                    <div className="card-header card-header-02">
                    State Emergency Operation Centre [SEOC]
                    </div>
                    <div className="card-body card-body-02 contact-card-body">
                      <div className="card-inside-row">
                        <div className="text">TOLL-FREE Number </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>1070
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">Director, Disaster Management </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>094 36 22 7520
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">Nodal Officer</div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>070 02 65 7604
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">SEOC</div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>094 36 07 4396 <br/> <i class="fas fa-phone-alt"></i>082 57 89 1310
                        </div>
                      </div>                      
                      <div className="card-inside-row">
                        <div className="text" style={{ width: "50%" }}>
                          E Mail
                        </div>
                        <div className="contact" style={{ width: "50%" }}>
                        <i class="fas fa-envelope"></i>arun01ddm@gmail.com
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* EOF second card row */}

              {/* Third contact card row */}
              <div className="row">
                <div className="col-sm-6 contact-card pr-15">
                  <div className="card">
                    <div className="card-header card-header-03">
                      State Police Control Room HQ, Itanagar
                    </div>
                    <div className="card-body card-body-03 contact-card-body">
                      <div className="card-inside-row">
                        <div className="text">TOLL-FREE Number </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>100
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">FAX </div>
                        <div className="contact">
                          <i class="fas fa-fax"></i>0360-2214064
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">
                          <i class="fas fa-phone-alt"></i>
                          0360-2292317
                        </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>0360-2212295
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 contact-card pl-15">
                  <div className="card">
                    <div className="card-header card-header-04">
                    Fire & Emergency Services
                    </div>
                    <div className="card-body card-body-04 contact-card-body">
                      <div className="card-inside-row">
                        <div className="text">
                        Toll Free Number
                        </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>1070
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">
                        Nodal Officer
                        </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>0981 16 77 739
                        </div>
                      </div>
                      <div className="card-inside-row">
                        <div className="text">
                        Alternate Nodal Officer
                        </div>
                        <div className="contact">
                          <i class="fas fa-phone-alt"></i>0948 52 36 611
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* EOF third card row */}
            </div>
            <div className="col-md-3">
              <div className="leadership-wrapper">
                <div className="leadership-title">Important Links</div>
                <ImportantLink />
                <div className="leadership-title mt-3 helpline-background  ">Emergency / Helpline Numbers</div>
                <NewsAndMedia />
              </div>
            </div>
          </div>
          {/* EOF body card section */}
        </div>
      </div>
    </Fragment>
  );
}
