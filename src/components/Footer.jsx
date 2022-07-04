import "./footer.style.css";

import footerLogo from "../assets/footer-logo.png";
import appIcons from "../assets/app-store-logos.png";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="logo-content">
            <div className="footer-logo">
              <img src={footerLogo} alt="Gaddideals Logo" />
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris,
              commodo tortor, enim eget turpis pellentesque egesta.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Mauris, commodo
              tortor, enim eget turpis pellentesque egesta.eget turpis
              pellentesque egesta.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Mauris, commodo tortor, enim eget turpis
              pellentesque egesta.
            </p>
          </div>

          {/* footer sitemap one */}
          <div className="footer-sitemap-one">
            <ul>
              <li>
                <a href="#contactus">Contact Us</a>
              </li>
              <li>
                <a href="#aboutus">About Us</a>
              </li>
              <li>
                <a href="#privacypolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms&conditions">Term's & Condition</a>
              </li>
            </ul>
          </div>

          {/* footer Sitemap two  */}
          <div className="footer-sitemap-two">
            <ul>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#customerservices">Customer Services</a>
              </li>
              <li>
                <a href="#howItWorks">How It Works</a>
              </li>
              <li>
                <a href="#faqs">FAQ's</a>
              </li>
            </ul>
          </div>

          {/* download */}
          <div className="footer-download">
            <div className="footer-download-title">
              <span>Gaddideals</span>
              <h5>-Download from-</h5>
            </div>
            <div className="app-icons">
              <img src={appIcons} alt="app store" />
            </div>
          </div>
        </div>

        <div className="break-line">
          <span className="cricle"></span>
          <div className="line"></div>
          <span className="circle"></span>
        </div>

        <div className="footer-bottom">
          <div className="top-cities">
            <h3>Top Cities</h3>

            <div className="cities">
              <div className="cities-row">
                <a href="#city">NewDelhi</a>
                <span className="border"></span>
                <a href="#city">Noida</a>
                <span className="border"></span>
                <a href="#city">Kolkata</a>
                <span className="border"></span>
                <a href="#city">Pune</a>
                <span className="border"></span>
              </div>

              <div className="cities-row">
                <a href="#city">Ahmedabad</a>
                <span className="border"></span>
                <a href="#city">Bengaluru</a>
                <span className="border"></span>
                <a href="#city">Mumbai</a>
                <span className="border"></span>
                <a href="#city">Pune</a>
                <span className="border"></span>
              </div>

              <div className="cities-row">
                <a href="#city">Gurgaon</a>
                <a href="#city">Hyderabad</a>
                <a href="#city">Chennai</a>
                <a href="#city">Pune</a>
              </div>
            </div>
          </div>

          <div className="top-brands">
            <h3>Top Brands</h3>

            <div className="brands">
              <div className="brands-row">
                <a href="#city">NewDelhi</a>
                <span className="border"></span>
                <a href="#city">Noida</a>
                <span className="border"></span>
                <a href="#city">Kolkata</a>
                <span className="border"></span>
                <a href="#city">Pune</a>
                <span className="border"></span>
              </div>

              <div className="brands-row">
                <a href="#city">Ahmedabad</a>
                <span className="border"></span>
                <a href="#city">Bengaluru</a>
                <span className="border"></span>
                <a href="#city">Mumbai</a>
                <span className="border"></span>
                <a href="#city">Pune</a>
                <span className="border"></span>
              </div>

              <div className="brands-row">
                <a href="#city">Gurgaon</a>
                <a href="#city">Hyderabad</a>
                <a href="#city">Chennai</a>
                <a href="#city">Pune</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
