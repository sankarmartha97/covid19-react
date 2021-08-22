import React, { Component } from "react";
import { Fragment } from "react";
import { Loading } from "element-react";
import "element-theme-default";
import {
  MiniNavComponent,
  AppHeaderComponent,
  NavbarComponent,
  SliderComponent,
  BodyContent,
  Footer,
  ClientLogo,
} from "../component";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
    };
  }
  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_URL}/status/lastUpdated`)
    .then(res => res.json())
    .then(lastUpdated => this.setState({ lastUpdated :lastUpdated[0]},localStorage.setItem('last',lastUpdated[0]),sessionStorage.setItem('last',lastUpdated[0]), localStorage.setItem('lastDataDate', lastUpdated[1])));
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

          {/* slider component */}
          <SliderComponent />

          {/* body content component */}
          <BodyContent />

          {/* client log section */}
          <ClientLogo />

          {/* Footer content section */}
          <Footer />
        </div>
      </Fragment>
    );
  }
}
