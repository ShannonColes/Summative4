import { useState, useEffect } from "react";
// import mobile menu
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
//import list from bootstrap icons
import { List } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Header = () => {
  const [menuIsOpen, openMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const navigate = useNavigate();

  // fetch the logo with useEffect
  useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}wp-json/custom/v1/nav-logo`
        );
        if (response.status === 200) {
          const data = response.data;
          console.log(response.data);
          setLogoUrl(data[0]);
        } else {
          console.error("failed to fetch logo");
        }
      } catch (error) {
        console.error("Error fetching logo URL", error);
      }
    };

    fetchNavLogo();
  }, []);
  // end of logo url fetch! -----------------------------**

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    // stops scrolling
    document.body.classList.toggle("no-scroll");
  };

  return (
    <>
      <div id="topnav">
        <div id="logo" onClick={() => navigate("/")}>
          <img src={logoUrl} alt="Hyde's logo" />
        </div>
        {/* Desktop menu -------------------------------** */}

        <ul id="menu">
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

        <div id="menu-container">
          <button
            id="menu-btn"
            className="show-mobile-menu-button"
            onClick={toggleMobileMenu}
            style={{ display: menuIsOpen ? "none" : "block" }}
          >
            <List id="hamburger-icon" />
          </button>
        </div>
      </div>

      {/* if menu is open show the mobile menu */}
      {/* mobile menu close method is the prop */}
      {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
    </>
  );
};

export default Header;
