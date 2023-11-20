import { useState, useEffect } from "react";
import axios from "axios";

const useCustomiser = () => {
  // variable for each setting from the customiser
  const [bgColor, setBgColor] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  //add extra state if you want/need more settings
  const [navColor, setNavColor] = useState("");
  const [footerColor, setFooterColor] = useState("");

  const baseUrl = import.meta.env.VITE_WP_BASEURL;

  // Full customiser API Endpoint
  // http://localhost/myfirstwp/wp-json/custom-theme/v1/customizer-settings

  useEffect(() => {
    axios
      .get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
      .then((response) => {
        const { backgroundColor, fontFamily, navbarColor, footerColor } =
          response.data; //add to the destructure
        setBgColor(backgroundColor);
        setFontFamily(fontFamily);
        //change the state to the destructure
        setNavColor(navbarColor);
        setFooterColor(footerColor);
      })

      .catch((error) => {
        console.error("error fetching customizer settings", error);
      });
  }, [baseUrl]);

  return { bgColor, fontFamily, navColor, footerColor }; // add to return object
};

export default useCustomiser;
