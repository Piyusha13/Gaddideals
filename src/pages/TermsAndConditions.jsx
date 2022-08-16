import React from "react";
import Navbar from "../components/Navbar";
import "./TermsAndConditions.style.css";
import TACbannerImg from "../assets/TACBanner.png";
import TACImg from "../assets/TAC_img.png";
import Footer from "./../components/Footer";
import gp from "../assets/app-store.png";
import ap from "../assets/google-play.png";
import { store } from "./../store/store";

function TermsAndConditions() {
  return (
    <div>
      <Navbar />
      <div className="banner-div">
        <img
          className="tac-banner-img"
          src={TACbannerImg}
          alt="terms&conditionsImg"
        />
        <div className="heading-TAC">
          <span>Term’s & Condition</span>
        </div>
        <div className="downloads-div">
          <img src={gp} className="gp-img" alt="" />
          <img src={ap} className="ap-img" alt="" />
        </div>
      </div>
      <div className="cotent-div gd_container">
        <p>
          BY USING THE WEBSITE, YOU AGREE TO THE FOLLOWING TERMS AND CONDITIONS
          IN THE AGREEMENT. PLEASE NOTE THAT IN THE EVENT OF ANY CHANGE IN THIS
          AGREEMENT, WE WILL PUBLISH IT ONLINE ON THE WEBSITE. WE ENCOURAGE YOU
          TO REVIEW THE SITE PERIODICALLY FOR CHANGES IN THE TERMS AND
          CONDITIONS.
        </p>
        <p>
          This document is an electronic record in terms of the Information
          Technology Act, 2000 and rules there under as applicable and the
          amended provisions about electronic records in various statutes as
          amended by the Information Technology Act, 2000. This electronic
          record is generated by a computer system and does not require any
          physical or digital signatures
        </p>
        <p>
          This document is published by the provisions of Rule 3 (1) of the
          Information Technology (Intermediaries guidelines) Rules, 2011 that
          require publishing the rules and regulations, privacy policy, and user
          agreement for access or usage of the www.gaddideals.com website
        </p>
        <h1>Terms of Use</h1>
        <p>
          When you use this site, you acknowledge that you have read this
          agreement and accept and will be bound by the terms hereof. Gaddideals
          reserves the right to modify such terms from time to time, as may be
          required.
        </p>
        <h5>1. Purpose</h5>
        <p>
          As stated above, the contents provided on or through this site are
          solely for information purposes. They do not substitute for specific
          advice whether for investment, legal, taxation, or other purposes, and
          are not intended to provide you with any nature of certification,
          guarantee or warranty. By accessing, browsing, and using this site,
          you agree and acknowledge that you understand this limited and
          restricted use and agree that you would not rely on the information
          and materials contained in this site for any purposes except as
          Gaddideals intends or specifies under this agreement. You further
          agree that you are ultimately responsible for determining your
          specific requirements and consequences in all actual matters.{" "}
        </p>
        <p>
          Gaddideals disclaims all liability for damages caused by the use of
          any content on the site. You agree that you are providing Gaddideals
          with personal details regarding your mobile phone address. You also
          agree that Gaddideals may use the information for automated analysis.
          You further agree that Gaddideals, to increase the value and benefit
          of this service to you, may provide your name and contact information
          to any third-party service provider.
        </p>
        <p>
          Gaddideals will provide services to research used commercial vehicles,
          prices, technical specifications, and other attributes. The services
          can include listing your used commercial vehicle online or browsing
          through the list of the used commercial vehicles listed by users of
          Gaddideals. Gaddideals makes no claims regarding the data's accuracy
          or the information's applicability to any specific situation.
        </p>
        <p>
          Gaddidealswill also send SMS to the users' top callers or send an
          email to the users' friends, letting them know about the service.
        </p>
        <h5>2. Terminology </h5>
        <p>
          a. The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice, and any or all Agreements:
          “Client”, “You” “User” and “Your” refers to you, the person accessing
          this website, and accepting the Company's terms and conditions.
          “Company”, “Ourselves”, “We” and “Us” refers to our Company. Who visit
          or access or use or avail any service or product (collectively
          “usage”) on or through website/mobile site/App (individually and
          collectively, “Website”).
        </p>
        <h5>3. Disclosure</h5>
        <p>
          Any service or product provided through Our Website may be provided
          either by GADDIDEALS or its vendor, dealer, OEM, channel partners, and
          other third parties (“other entities”) which are registered with
          Gaddideals to render the services or provide products through the
          Website.
        </p>
        <p>
          You acknowledge and agree that Gaddideals may share, disclose,
          transfer, or part with Your Information to other entities depending
          upon the type of service or product You are looking for or for one or
          more of the permissible purposes. Gaddideals may also share Your
          personal or non-personal information where it is required to share the
          same with other entities for providing you the service or product. You
          provide Gaddideals, your unconditional consent to do the same.
        </p>
        <p>
          Gaddideals may share statistical data and/or other Non-personal
          Information or details without your express or implied consent to
          facilitate various programs or initiatives launched by Gaddideals,
          third-party service providers, partners, or financial institutions,
          from time to time.
        </p>
        <p>
          In addition to this, Gaddideals reserve the right to share Your
          Information with any Government Agency or other authorized law
          enforcement agencies (LEAs) mandated under law to obtain Your
          Information for verification of identity or prevention, detection, and
          investigation including but not limited to cyber incidents,
          prosecution, and punishment of offenses, etc.
        </p>
        <h5>4. Third-Party Links</h5>
        <p>
          It is clarified that while Your use Our Website, you might see the
          links to the third-party website/advertisements / electronic
          communication service, which are provided by the third parties. As the
          operation of the third party is not under the control of Gaddideals,
          therefore Gaddideals does not make any endorsement/guarantee of any
          service or product neither offered through third party websites nor
          makes any representation related to any privacy policy or other
          policies of such third party. Any usage of such third-party website or
          availing of any service or product through a third party shall be at
          Your risk and Gaddideals is not responsible for any loss/damage or
          otherwise.
        </p>
        <h5>5. Warranties </h5>
        <p>
          Gaddideals or any of its affiliates, associates, or employees shall
          not be in any way responsible for any loss or damage that may arise
          from any inadvertent error in the information on this site. The data
          from or through this site is provided 'as is'. Whether express or
          implied, all warranties regarding any matter about the site or
          content, including, without limitation, implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement are disclaimed.
        </p>
        <p>
          Gaddideals and its affiliates and associates shall not be liable, at
          any time, for any failure of performance, error, omission,
          interruption, deletion, defect, delay in operation or transmission,
          computer virus, communications line failure, theft or destruction, or
          unauthorized access to, alteration of, or use of the information
          contained on the site.No representations, warranties, or guarantees
          are made concerning the information's accuracy, adequacy, reliability,
          completeness, suitability, or applicability to a particular situation.
        </p>
        <h5>6. Intellectual Property Rights</h5>
        <p>
          The contents posted on this website in terms of information, logo,
          graphics, design, photographs, audio/video, and text are the copyright
          works of Gaddideals unless stated otherwise. Hence, the contents
          available on the website shall not be copied, reproduced, downloaded,
          uploaded, posted, published, transmitted, or distributed in any form
          without obtaining prior permission from Gaddideals.com
        </p>
        <h5>7. Authorization</h5>
        <p>
          In the purview of the Telecom Regulatory Authority of India (TRAI)
          guidelines, You hereby authorize Gaddideals and its
          affiliates/partners or otherwise who are accessing the Your
          Information by their association with Gaddideals to communicate with
          You through telephone/mobile, email, SMS, or other modes of
          communication even if Yours number/numbers(s) is/are registered in the
          National Do Not Call Registry (NDNC) or www.nccptrai.gov.in
        </p>
        <h5>8. Modification on the site</h5>
        <p>
          Gaddideals reserves the right to amend or modify this Privacy Policy
          at any time, as and when the need arises. We request you to regularly
          check this Privacy Policy from time to time to keep you apprise of
          changes made. Your continued use of the Website gives your
          unconditional acceptance of such change in terms of Privacy Policy.
          You agree that Gaddideals shall not be liable to you or any third
          party for any modification, suspension, or discontinuance of the site.
        </p>
        <h5>9. Buying</h5>
        <p>
          Gaddideals strongly advises you not to test the site with false
          purchase requests, as it will put you at substantial personal legal
          risk. It is a crime to use a false name or other incorrect personal
          information to buy. Willfully entering erroneous or fictitious
          purchase requests may result in prosecution by Gaddideals. Please be
          aware that even if you do not give Gaddideals your real name, your web
          browser transmits a unique address to us, which law enforcement
          officials can use to identify you. As a seller, you certify that all
          information provided by you against your listed commercial vehicle is
          correct.
        </p>
        <h5>10. Selling</h5>
        <p>
          As a registered member, you may list the used commercial vehicle for
          sale on the site. You must be legally able to sell the vehicle you
          list for sale on our site. Listings may only include text
          descriptions, graphics, and pictures that describe your vehicle for
          sale. Sellers must list all vehicles in an appropriate category on the
          site. Soliciting business offline or outside of the site, by
          indicating your contact details (e.g. contact phone number, address,
          or email address) in the vehicle listing or elsewhere on the site
          other than in the Sell used commercial vehicle Form is expressly
          prohibited. It would be considered a breach of the User agreement.
          Sellers must keep all listed used commercial vehicles in stock for
          successful fulfillment of sales. The used commercial vehicle' listing
          description must not be misleading and must describe the actual
          condition of the product. If the used commercial vehicle description
          does not match the used commercial vehicle's exact condition, you
          agree to refund any amounts you may have received from the buyer.
        </p>
        <p>
          A token of 1% of the listing price has to be paid by the seller post
          the transaction is over{" "}
        </p>
        <h5>11. Liability</h5>
        <p>
          You agree to defend, indemnify, and hold us and our affiliates
          harmless from and against any claims, losses, liabilities, damages,
          and expenses (including attorney’s fees) arising out of your use of
          this site. We reserve the right to add, delete, or modify any or all
          terms of use at any time with or without notice. You assume the entire
          cost of any necessary service, repair, or correction.{" "}
        </p>
        <p>
          As per these Terms, users are solely responsible for every material or
          content uploaded on to the Website. GADDIDEALS does not review the
          contents in any way before they appear on the Website. GADDIDEALS does
          not verify, endorse or otherwise vouch for the contents of any user or
          any content generally posted or uploaded on to the Website. Users can
          be held legally liable for their contents and may be held legally
          accountable if their contents or material include, for example,
          defamatory comments or material protected by copyright, trademark,
          etc. If you come across any abuse or violation of these Terms, please
          report
        </p>
        <h5>12. Governing law</h5>
        <p>
          These terms shall be governed by and constructed by the laws of India
          without reference to conflict of laws principles and disputes arising
          in relation hereto shall be subject to the exclusive jurisdiction of
          the courts at Mumbai.
        </p>
        <h5>13. Severability</h5>
        <p>
          If any provision of the Terms is determined to be invalid or
          unenforceable in whole or in part, such invalidity or unenforceability
          shall attach only to such provision or part of such provision and the
          remaining part of such provision and all other provisions of these
          Terms shall continue to be in full force and effect.
        </p>
      </div>
      <div className="tac_bottom-img gd_container">
        <img src={TACImg} alt=""></img>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
