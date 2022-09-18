import React from "react";
import Navbar from "../components/Navbar";
import "./PrivacyPolicy.style.css";
import TACbannerImg from "../assets/TACBanner.png";
import PPImg from "../assets/PP_img.png";
import Footer from "./../components/Footer";
import gp from "../assets/app-store.png";
import ap from "../assets/google-play.png";
import { store } from "./../store/store";

function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="banner-div">
        <img
          className="tac-banner-img"
          src={TACbannerImg}
          alt="terms&conditionsImg"
        />
        <div className="heading-PP">
          <span>Privacy Policy</span>
        </div>
        <div className="downloads-div">
          <img
            src={gp}
            className="gp-img"
            alt=""
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/games?utm_source=apac_med&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700058906740516_creativeid_480977734970_device_c&gclid=Cj0KCQjw54iXBhCXARIsADWpsG-CCJ0Va1SM47pcLde7OIB2qTUQqRMNXrjApqyWTvovb5yTz72kgn8aAnMeEALw_wcB&gclsrc=aw.ds";
            }}
          />
          <img
            src={ap}
            className="ap-img"
            alt=""
            onClick={() => {
              window.location.href = "https://www.apple.com/in/app-store/";
            }}
          />
        </div>
      </div>
      <div className="cotent-div gd_container">
        <p>
          GADDIDEALS respects the privacy of its users. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website www.gaddideals.com and our mobile
          application, including any other media form, media channel, mobile
          website, or mobile application related to or connected to it. Please
          read this privacy policy carefully. If you disagree with the terms of
          this privacy policy, please do not access the site. We reserve the
          right to make changes to this privacy policy at any time and for any
          reason. Any changes or modifications will be effective immediately
          upon posting the revised policy on the website. You waive the right to
          receive specific notice of each such change or modification.
        </p>
        <h5>1. Information we collect</h5>
        <p>
          Users can browse the Website without revealing any personal
          information. In some places, GADDIDEALS would indicate which fields
          are required and which fields are optional. Users always have the
          option to not provide information by choosing not to use a particular
          service or feature on the Website. GADDIDEALS may automatically track
          certain information about the User based on the User’s behavior on the
          Website. Upon usage of the Site, GADDIDEALS collects and stores the
          personal information given, primarily to provide a safe, efficient,
          smooth, and customized experience. This allows GADDIDEALS to provide
          services and features that most likely meet the User’s needs and
          expectations, and to customize the Site to make the User’s experience
          safer and easier and more productive. Personal identifying information
          such as your name, shipping address, email id, and telephone number.
          Demographic information such as your age, gender, hometown, and
          interests; is voluntarily provided when you register with our website
          or our mobile application. Data collection devices such as “cookies”
          on certain pages of the Site are used to help analyze the Site’s web
          page flow, measure promotional effectiveness, and promote trust and
          safety for the Users. Cookies are also used to allow the user to enter
          his / her password less frequently during a session. Most cookies are
          “session cookies,” i.e. that they are automatically deleted from the
          User’s hard drive at the end of a session. Our servers automatically
          collect the information when you access the website, such as your IP
          address, browser type, operating system, access times, and the pages
          you have viewed directly before and after accessing the website. In
          case you are using our mobile application, this information may also
          include your device name and type, operating system, phone number, and
          country. It may also include your likes and replies to a post, other
          interactions with the application and other users via server log
          files; as well as any additional information you choose to provide.
        </p>
        <h5>2. Use of information collected</h5>
        <p>
          GADDIDEALS uses the personal information provided to facilitate the
          services as requested by the User. At times and if required,
          GADDIDEALS may look across multiple users to identify problems or
          resolve disputes, including but not limited to examining the User’s
          personal information to identify users using multiple User IDs or
          aliases. GADDIDEALS may also (and the User authorizes GADDIDEALS to)
          compare and review the User’s personal information for errors,
          omissions, and for accuracy. The User agrees that GADDIDEALS may use
          personal information about the User to improve the Company’s marketing
          and promotional efforts, analyze site usage, improve the Site’s
          content and product offerings, and customize the Site’s content,
          layout, and services. These uses improve the Site and better tailor it
          to meet the User’s needs, so as to provide the User with a smooth,
          efficient, safe, and customized experience while using the Site. More
          specifically, but not by limitation, GADDIDEALS may conduct (and the
          User authorizes GADDIDEALS to conduct) promotional and marketing
          activities on the Registered Users by way of Short Messaging Services
          (SMS), email, etc. GADDIDEALS may also use the mobile number and email
          of the registered users to provide information to such registered
          users, including but not limited to information relating date of the
          event, price advisory, and date of payment of the vehicle(s) The User
          agrees that GADDIDEALS may use the User’s personal information to
          contact the User and deliver information that, in some cases, are
          targeted to specific to each User’s interests, such as targeted banner
          advertisements, administrative notices, product offerings, and
          communications relevant to such User’s use of the Site. By accepting
          this Privacy Policy, the User expressly agrees to receive this
          information. If the User does not wish to receive these
          communications, the User may opt out of the receipt of certain
          communications from their profile at any time. We may share your
          information with our business partners to offer you certain products,
          services, or promotions. With your consent, or with an opportunity for
          you to withdraw consent, we may share your information with third
          parties for marketing purposes, as permitted by law.
        </p>
        <h5>3. Data from interpersonal organization and third party</h5>
        <p>
          User information from social networking sites, such as Apple’s Game
          Center, Facebook, Google+, Instagram, Pinterest, and Twitter,
          including your name, your social network username, location, gender,
          birth date, email address, profile picture, and public data for
          contacts, if you connect your account to such social networks. In case
          you are using our mobile application, this information may further
          include the contact information of anyone you invite to use and/or
          join our mobile application. Information from third parties, such as
          personal information or network friends, if you connect your account
          to the third party and grant the website permission to access this
          information.
        </p>
        <h5>4. Legal request</h5>
        <p>
          GADDIDEALS may disclose personal information if required to do so by
          law or in the good faith belief that such disclosure is reasonably
          necessary to respond to court orders or any other legal process.
          GADDIDEALS may disclose personal information to law enforcement
          offices, third-party rights owners, or others in the good faith belief
          that such disclosure is reasonably necessary to enforce GADDIDEALS’s
          Terms of Use or this Privacy Policy, respond to claims that an
          advertisement, posting or other content violates the rights of any
          third party, Protect the rights, property or personal safety of the
          Users or the general public
        </p>
        <h5>5. Use of site by minors</h5>
        <p>
          Children are not eligible to use the Site and minors (under the age of
          18) should not submit any personal information on the Site. Minors
          cannot sell or purchase any item on the site
        </p>
        <h5>6. Third-party service providers and business partners</h5>
        <p>
          We may share your information with third parties that perform services
          for us or on our behalf, including data analysis, email delivery,
          hosting services, customer service, and marketing assistance. We may
          share your information with our business partners to offer you certain
          products, services, or promotions.
        </p>
        <h5>7. Website analytics</h5>
        <p>
          We may also partner with selected third-party vendors to allow
          tracking technologies and marketing of services on the website and our
          mobile application through first-party cookies and third-party
          cookies. It helps to analyze and track users’ use of the website and
          our mobile application, determine the popularity of certain content,
          and better understand online activity. By accessing the website and
          our mobile application, you consent to collecting and using your
          information by these third-party vendors. You are encouraged to review
          their privacy policy and contact them directly for responses to your
          questions. We do not transfer personal data to these third-party
          vendors. However, suppose you do not want any information to be
          collected and used by tracking technologies. In that case, you can
          visit the third-party vendor or the Network Advertising Initiative
          Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool. You should
          be aware that getting a new computer, installing a new browser,
          upgrading an existing browser, or erasing or otherwise altering your
          browser’s cookies files may also clear certain opt-out cookies,
          plug-ins, or settings.
        </p>
        <h5>8. Security of your data</h5>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we take reasonable steps
          to secure the personal information you provide us, please be aware
          that no security measures are perfect and can guarantee against any
          interception or other types of misuse. Any information disclosed
          online is vulnerable to interception and misuse by unauthorized
          parties. Therefore, we cannot guarantee complete security if you
          provide personal information.
        </p>
      </div>
      <div className="pp_bottom-img gd_container">
        <img src={PPImg} alt=""></img>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
