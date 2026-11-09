function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="companyinfo">
                <h2><span>E</span>-SHOPPER</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="address">
                <img
                  src="http://127.0.0.1:8000/frontend/images/home/map.png"
                  alt="Address map"
                />
                <p>505 S Atlantic Ave, Virginia Beach, VA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <p className="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
            <p className="pull-right">Designed by <span>Themeum</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
