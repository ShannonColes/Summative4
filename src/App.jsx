import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

// import customiser hook for style changes from WP
import useCustomiser from "./Hooks/useCustomiser";
// Import Swiper styles
import "swiper/swiper-bundle.css";

// Import Swiper JS
import Swiper from "swiper/bundle";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Links from "./Links";

function App() {
  const { bgColor, fontFamily, navColor, footerColor } = useCustomiser();

  useEffect(() => {
    //apply the bg color to our body element
    document.body.style.backgroundColor = `#${bgColor}`;

    //change the font based on the returned value
    if (fontFamily === "Roboto") {
      document.body.style.fontFamily = `'Roboto', sans-serif`;
    }

    if (fontFamily === "Poppins") {
      document.body.style.fontFamily = `'Poppins', sans-serif`;
    }

    if (fontFamily === "Raleway") {
      document.body.style.fontFamily = `'Raleway', sans-serif`;
    }

    // change nav color
    document.getElementById("topnav").style.backgroundColor = `${navColor}`;

    // change footer color
    document.getElementById(
      "footer-container"
    ).style.backgroundColor = `${footerColor}`;
  }, [bgColor, fontFamily, navColor, footerColor]);

  // end of customization
  return (
    <>
      <div className="app">
        <HashRouter>
          <ScrollToTop />
          <Header />
          <Links />
          <Footer />
        </HashRouter>
      </div>
    </>
  );
}

export default App;
