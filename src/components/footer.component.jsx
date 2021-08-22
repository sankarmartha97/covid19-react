import React, {Fragment} from 'react'
const SiteFooter = () => {
    //return main component
    return (
      <Fragment>
        <marquee   direction='right'  behavior="alternate">
        <p>
        {/* "We stand with everyone fighting on the frontlines", SRSAC , GoAP,
          Itanagar / <span className="helpline_number">Helpline Numbers: +91 3602292777, +91 3602292774, +91
          3602292775</span> */}
          Conceptualised and Maintained by State Remote Sensing Application Center, GoAP, Itanagar
          / <span className="helpline_number">Technology Powered by: © SkyMap Global</span>
        </p>
        </marquee>
      </Fragment>
    );
}

export default SiteFooter;