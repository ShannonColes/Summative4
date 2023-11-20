import { Link } from "react-router-dom";
import { X } from "react-bootstrap-icons";

const MobileMenu = ({ closeMethod }) => {
  return (
    <>
      <button id="close-menu" onClick={closeMethod}>
        <X />
      </button>
      <ul id="mobile-menu">
        {/* mobile nav links */}
        <li>
          <Link to="/" onClick={closeMethod}>
            HOME
          </Link>
        </li>
        <li>
          <Link to="/work" onClick={closeMethod}>
            WORK
          </Link>
        </li>
        <li>
          <Link to="/shop" onClick={closeMethod}>
            SHOP
          </Link>
        </li>
        <li>
          <Link to="/gallery" onClick={closeMethod}>
            GALLERY
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMethod}>
            CONTACT
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenu;
