import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

// Image import
import shopImage from "/img/shopimage.webp";

// Product URL
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEndpoint = `${productsUrl}/${id}`;

  useEffect(() => {
    // Fetch product data
    axios
      .get(productEndpoint)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productEndpoint]);

  useEffect(() => {
    // Fetch product categories
    if (product && product.categories) {
      setCategories(product.categories);
    }
  }, [product]);

  function getFeaturedImage(product) {
    if (product && product.images && product.images[0]) {
      return product.images[0].src;
    } else {
      return "https://placehold.co/600x400";
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatPrice = (price) => {
    return (price / 100).toFixed(2);
  };

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Hydes website Single Product page displaying a selected product details and a price"
        />
        <meta
          name="keywords"
          content="Product, price, buy now, Shop Online, image"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content="Single product page displaying a selected product with an image, title, price, description and buy now button "
        />
      </Helmet>
      <div className="static-hero-section">
        <img src={shopImage} alt="hololive advent image" />
        <div className="header-absolute">
          <h1>SHOP ONLINE</h1>
        </div>
      </div>
      <div className="single-product-container">
        <div className="single-product-image-container">
          <img src={getFeaturedImage(product)} alt="Donation image" />
        </div>

        <div className="categories">
          {categories.map((category) => (
            <Link
              to={`/producttaxonomydisplay/${category.id}`}
              key={category.id}
            >
              <span className="category-pill">{category.name}</span>
            </Link>
          ))}
          <h3 className="name">{product.name}</h3>
          <h4 className="product-price">
            ${formatPrice(product.prices.price)}
          </h4>
          <div
            id="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className="form-button-wrapper">
          <button className="shop-buttons-red">BUY NOW</button>
        </div>
        <div className="form-button-wrapper">
          <button
            className="shop-buttons-black"
            onClick={() => navigate("/shop")}
          >
            Return to Shop
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
