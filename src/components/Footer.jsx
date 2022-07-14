import "./footer.style.css";

import footerLogo from "../assets/footer-logo.png";
import appIcons from "../assets/app-store-logos.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";

const Footer = () => {
  return (
    <>
    <footer className="footer-section">
      <div className="social-container">
        <div className="social-title">
          <h5>Keep in Touch</h5>
        </div>
        <div className="social-links">
          <img src={facebookIcon} alt="facebook" />
          <img src={twitterIcon} alt="twitter" />
          <img src={instagramIcon} alt="instagram" />
        </div>
      </div>

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
              <h5>
                Download <br /> Mobile App
              </h5>
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
      <div className="footer-copyright">
        <p>
          ®<a href="#gaddideals">2022 www.gaddideals.com</a> |{" "}
          <a href="#carapace">Site By Carapace</a> | All rights reserved
        </p>
      </div>
    </footer>

    {/* mobile responsive footer */}

    <footer className="mobile-footer-section">
    <div className="mobile-social-container">
      <div className="mobile-social-title">
        <h5>Keep in Touch</h5>
      </div>
      <div className="mobile-social-links">
        <img src={facebookIcon} alt="facebook" />
        <img src={twitterIcon} alt="twitter" />
        <img src={instagramIcon} alt="instagram" />
      </div>
    </div>

    <div className="mobile-footer-container">
      <div className="mobile-footer-top">
        <div className="mobile-logo-content">
          <div className="mobile-footer-logo">
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

         {/* download */}
         <div className="mobile-footer-download">
          <div className="mobile-footer-download-title">
            <span>Gaddideals</span>
            <h5>-Download from-</h5>
          </div>
          <div className="mobile-app-icons">
            <img src={appIcons} alt="app store" />
          </div>
        </div>
      

      <div className="mobile-break-line">
        {/* <span className="mobile-cricle"></span> */}
        <div className="mobile-line"></div>
        {/* <span className="mobile-circle"></span> */}
      </div>

        {/* footer sitemap one */}
        <div className="mobile-footer-sitemap-one">
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
        <div className="mobile-footer-sitemap-two">
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

       

      <div className="mobile-break-line">
        {/* <span className="mobile-cricle"></span> */}
        <div className="mobile-line"></div>
        {/* <span className="mobile-circle"></span> */}
      </div>
      </div>
      <div className="mobile-footer-bottom">
        <div className="mobile-top-cities">
          <h3>Top Cities</h3>

          <div className="mobile-cities">
            <div className="mobile-cities-row">
              <a href="#city">NewDelhi</a>
              <span className="mobile-border"></span>
              <a href="#city">Noida</a>
              <span className="mobile-border"></span>
              <a href="#city">Kolkata</a>
              <span className="mobile-border"></span>
              <a href="#city">Pune</a>
              <span className="mobile-border"></span>
            </div>

            <div className="mobile-cities-row">
              <a href="#city">Ahmedabad</a>
              <span className="mobile-border"></span>
              <a href="#city">Bengaluru</a>
              <span className="mobile-border"></span>
              <a href="#city">Mumbai</a>
              <span className="mobile-border"></span>
              <a href="#city">Pune</a>
              <span className="mobile-border"></span>
            </div>

            <div className="mobile-cities-row">
              <a href="#city">Gurgaon</a>
              <a href="#city">Hyderabad</a>
              <a href="#city">Chennai</a>
              <a href="#city">Pune</a>
            </div>
          </div>
        </div>

        <div className="mobile-top-brands">
          <h3>Top Brands</h3>

          <div className="mobile-brands">
            <div className="mobile-brands-row">
              <a href="#city">NewDelhi</a>
              <span className="mobile-border"></span>
              <a href="#city">Noida</a>
              <span className="mobile-border"></span>
              <a href="#city">Kolkata</a>
              <span className="mobile-border"></span>
              <a href="#city">Pune</a>
              <span className="mobile-border"></span>
            </div>

            <div className="mobile-brands-row">
              <a href="#city">Ahmedabad</a>
              <span className="mobile-border"></span>
              <a href="#city">Bengaluru</a>
              <span className="mobile-border"></span>
              <a href="#city">Mumbai</a>
              <span className="mobile-border"></span>
              <a href="#city">Pune</a>
              <span className="mobile-border"></span>
            </div>

            <div className="mobile-brands-row">
              <a href="#city">Gurgaon</a>
              <a href="#city">Hyderabad</a>
              <a href="#city">Chennai</a>
              <a href="#city">Pune</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mobile-footer-copyright">
      <p>
        ®<a href="#gaddideals">2022 www.gaddideals.com</a> |{" "}
        <a href="#carapace">Site By Carapace</a> | All rights reserved
      </p>
    </div>
  </footer>
  </>
  );
};

export default Footer;
