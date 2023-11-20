import { Link } from "react-router-dom";

// import images
import covercorp from "/img/Covercorp-logo 2.svg";
import hololive from "/img/holopro-logo.svg";
import pixiv from "/img/pixiv.svg";
import xtwitter from "/img/xtwitter.svg";

const Footer = () => {
  return (
    <>
      <div id="footer-container">
        <div id="footer-flex-wrapper">
          <div id="footer-navigation">
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/work">WORK</Link>
              </li>
              <li>
                <Link to="/shop">SHOP</Link>
              </li>
              <li>
                <Link to="/gallery">GALLERY</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </div>

          <div id="footer-clients">
            <h4>CLIENTS</h4>
            <div>
              <a href="https://cover-corp.com/en/company" target="_blank">
                <img src={covercorp} alt="cover corp logo" />
              </a>
            </div>

            <a href="https://hololivepro.com/en/" target="_blank">
              <img src={hololive} alt="hololive logo" />
            </a>
          </div>

          <div id="footer-socials">
            <h4>SOCIALS</h4>
            <div>
              <a href="https://www.pixiv.net/en/users/21714218" target="_blank">
                <img src={pixiv} alt="pixiv logo" />
              </a>
            </div>
            <a href="https://twitter.com/tabakko" target="_blank">
              <img src={xtwitter} alt="x twitter logo" />
            </a>
          </div>
        </div>

        <div id="footer-rights-reserved">
          <p>
            ART & DESIGN © 2023 by Hyde. All rights reserved. Characters &
            relevant concepts in fanwork pieces belong to their respective
            owners.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
