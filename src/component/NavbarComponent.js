import React, { Fragment } from "react";

export default function NavbarComponent() {
  return (
    <Fragment>
      <div className="navbar-wrapper-website">
          <div className="row inside-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-brown">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span><i class="fas fa-home"></i></span>
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/app/dashboard" target="_blank">
                  Covid-19 Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://sdma-arunachal.in/" target="_blank">
                    Disaster Management
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="./image/DIST-CONTROL.pdf" target="_blank">
                Important Contacts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://www.arunachalpradesh.gov.in/" target="_blank">
                Citizen Information
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/grievance" target="_blank">
                Register Grievances
                </a>
              </li>
              <li className="nav-item btn-nav-item">
                <button className="btn btn-login">Login <i class="fas fa-sm fa-sign-in-alt"></i></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
          </div>
      </div>
    </Fragment>
  );
}
