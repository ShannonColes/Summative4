import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location]);

  // This component doesn't render anything, so it returns null
  return null;
}

export default ScrollToTop;
