import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const ProductName = ({ product }) => {
  return (
    <>
      <h3>Category: {product.name}</h3>
    </>
  );
};

const AllProductsInTaxonomy = ({ params }) => {
  const [products, setProducts] = useState([]);
  const endpoint = `${baseUrl}/product?product_cat=${params.id}&_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [endpoint]);

  const renderedProducts = products.map((product, index) => {
    // Modify this part to extract image and price data
    const featuredImage =
      product._embedded && product._embedded["wp:featuredmedia"]
        ? product._embedded["wp:featuredmedia"][0].source_url
        : "https://placehold.co/600x400";

    return (
      <div className="taxonomy-product-item" key={index}>
        <Link className="resource-link" to={`/singleproduct/${product.id}`}>
          <img
            className="product-image"
            src={featuredImage}
            alt={`Product ${index + 1}`}
          />
          <h4 className="name">{product.title.rendered}</h4>
        </Link>
      </div>
    );
  });

  return <>{renderedProducts}</>;
};

const ProductTaxonomyDisplay = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const productEndpoint = `${baseUrl}/product_cat/${params.id}`;

  useEffect(() => {
    axios
      .get(`${productEndpoint}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [productEndpoint]);

  return (
    <div id="product-taxonomy">
      <ProductName product={product} />
      <div className="taxonomy-grid-container">
        <AllProductsInTaxonomy params={params} />
      </div>
      <div className="form-button-wrapper">
        <button className="shop-buttons-black" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ProductTaxonomyDisplay;
