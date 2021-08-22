import React, { Component, Fragment } from "react";
import {
  CanvasComponent,
  EditorComponent,
  FooterComponent,
  HeaderComponent,
  LeftAssideComponent,
  NavBarComponent
} from "../component";
export default class _headerAnalysisPage extends Component {
  render() {
    return (
      <Fragment>
        {/* header section */}
        <HeaderComponent />

        {/* Application Navigation section */}
        <NavBarComponent />

        {/* body section */}
        <div className="row">
          <div className="col-sm-2">
            <LeftAssideComponent />
          </div>
          <div className="col-sm-6">
            <CanvasComponent />
          </div>
          <div className="col-sm-4">
            <EditorComponent />
          </div>
        </div>

        {/* footer section */}
        <FooterComponent />

      </Fragment>
    );
  }
}
