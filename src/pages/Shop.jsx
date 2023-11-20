import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//import url
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// Product Endpoint from our env
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // set state for static header images
  const [headerImage, setheaderImage] = useState(null);

  useEffect(() => {
    const headerEndpoint = `${baseUrl}/headerimage?_embed`;
    axios
      .get(`${headerEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setheaderImage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getFeaturedImage(data) {
    if (
      data &&
      data._embedded &&
      data._embedded["wp:featuredmedia"] &&
      data._embedded["wp:featuredmedia"][0].source_url
    ) {
      return data._embedded["wp:featuredmedia"][0].source_url;
    } else {
      return "https://placehold.co/600x400";
    }
  }

  const HeaderImages = ({ headerImages, index }) => {
    if (
      !headerImages ||
      headerImages.length === 0 ||
      index >= headerImages.length
    ) {
      return null;
    }

    const imageData = headerImages[index];

    return (
      <>
        <img
          src={getFeaturedImage(imageData)}
          alt="header image"
          key={imageData.id}
        />
        <div className="static-text-cta">
          <h2>{imageData.title.rendered}</h2>
        </div>
      </>
    );
  };

  useEffect(() => {
    axios
      .get(`${productsUrl}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (category) => {
    // Toggle between filtering and displaying all
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Function to filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories.some(
          (category) => category.name === selectedCategory
        )
      )
    : products;

  // Function to format the prices
  const formatPrice = (price) => {
    // Divide the price by 100 and format it with two decimal places
    return (price / 100).toFixed(2);
  };

  const Products = ({ products }) => {
    console.log({ products });
    const mappedProducts = products.map((product, index) => {
      function getFeaturedImage(product) {
        if (product && product.images && product.images[0]) {
          return product.images[0].src;
        } else {
          return "https://placeholder.co/600x400";
        }
      } //end of featured image function

      // Check if sale price is different from regular price
      const hasSalePrice =
        product.prices.sale_price &&
        product.prices.sale_price !== product.prices.regular_price;

      return (
        <div className="grid-product-item" key={index}>
          <Link className="product-link" to={`/singleProduct/${product.id}`}>
            <img
              className="product-image"
              src={getFeaturedImage(product)}
              alt="fubuki image"
            />

            <h3 className="name">{product.name}</h3>

            {hasSalePrice ? (
              <>
                <h4 className="name">
                  <del>${formatPrice(product.prices.regular_price)}</del>{" "}
                  {product.prices.currency_code}
                </h4>
                <h4 className="name">
                  ${formatPrice(product.prices.sale_price)}{" "}
                  {product.prices.currency_code}
                </h4>
              </>
            ) : (
              <h4 className="name">
                ${formatPrice(product.prices.regular_price)}{" "}
                {product.prices.currency_code}
              </h4>
            )}
          </Link>
        </div>
      ); //end of map return
    }); //end of map

    //return the products!
    return <>{mappedProducts}</>;
  }; //end of products

  return (
    <>
      <Helmet>
        <title>Shop Online</title>
        <meta
          name="description"
          content="Hydes website Shop page showing a category of buttons to filter through the products, the products displayed in a grid, title of products and items"
        />
        <meta
          name="keywords"
          content="Shop online, new, specials, prints, brushes, limited,"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Shop online" />
        <meta
          property="og:description"
          content="Shop page containing products displayed in a grid"
        />
        <meta
          property="og:image"
          content="https://hyde-website/wp-content/uploads/2023/11/display-image-one-scaled.webp"
        />
      </Helmet>

      <div className="static-hero-section">
        <HeaderImages headerImages={headerImage} index={2} />
        <div className="header-absolute">
          <h1>SHOP ONLINE</h1>
        </div>
      </div>
      <div className="center-wrapper">
        <div className="category-buttons-container">
          <button
            onClick={() => handleCategoryClick("New")}
            className={selectedCategory === "New" ? "active" : ""}
          >
            New
          </button>
          <p>|</p>
          <button
            onClick={() => handleCategoryClick("Special")}
            className={selectedCategory === "Special" ? "active" : ""}
          >
            Specials
          </button>

          <p>|</p>
          <button
            onClick={() => handleCategoryClick("Prints")}
            className={selectedCategory === "Prints" ? "active" : ""}
          >
            Prints
          </button>

          <p>|</p>
          <button
            onClick={() => handleCategoryClick("Brushes")}
            className={selectedCategory === "Brushes" ? "active" : ""}
          >
            Brushes
          </button>

          <p>|</p>
          <button
            onClick={() => handleCategoryClick("Limited")}
            className={selectedCategory === "Limited" ? "active" : ""}
          >
            Limited
          </button>
        </div>
      </div>

      <div className="shop-grid-container">
        {loading ? <p>Loading...</p> : <Products products={filteredProducts} />}
      </div>
    </>
  );
};

export default Shop;
