import React, { Component } from "react";
import { Fragment } from "react";
import { Loading } from "element-react";
import "element-theme-default";
import {
  MiniNavComponent,
  AppHeaderComponent,
  NavbarComponent,
  // SliderComponent,
  // BodyContent,
  AboutUsContent,
  Footer,
} from "../component";

export default class AboutUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
    };
  }
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        fullscreen: false,
      });
    }, 1000);

    this.setState({
      fullscreen: true,
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.fullscreen && <Loading fullscreen={true} />}
        <div className="site-main-wrapper">
          {/* mini nav component */}
          <MiniNavComponent />

          {/* app header component */}
          <AppHeaderComponent />

          {/* navigation component */}
          <NavbarComponent />

          {/* about us content section */}
          <AboutUsContent />

          {/* Footer content section */}
          <Footer />
        </div>
      </Fragment>
    );
  }
}
