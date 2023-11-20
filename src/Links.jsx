import { Route, Routes } from "react-router-dom";

//import of pages
import Home from "./pages/Home";
import Work from "./pages/Work";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// import components
import SingleProduct from "./components/SingleProduct";
import ProductTaxonomyDisplay from "./pages/ProductTaxonomyDisplay";
import Article from "./components/Article";
import ArticleTaxonomy from "./pages/ArticleTaxonomy";

const Links = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/articletaxonomy/:id" element={<ArticleTaxonomy />} />

      <Route path="/work" element={<Work />} />

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />

      {/* SHOP */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/singleproduct/:id" element={<SingleProduct />} />
      <Route
        path="/producttaxonomydisplay/:id"
        element={<ProductTaxonomyDisplay />}
      />
    </Routes>
  );
};

export default Links;
