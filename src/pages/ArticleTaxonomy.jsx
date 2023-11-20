import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const ArticleTaxonomy = () => {
  const { id } = useParams();
  const [adverts, setAdverts] = useState([]);
  const [taxonomy, setTaxonomy] = useState({ name: "" });
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch taxonomy information
    axios
      .get(`${baseUrl}/article/${id}`)
      .then((res) => {
        setTaxonomy(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch adverts based on the taxonomy
    const endpoint = `${baseUrl}/adverts?article=${id}&_embed`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res.data);
        setAdverts(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div id="product-taxonomy">
      <h3>Category: {taxonomy.name}</h3>
      <div className="taxonomy-grid-container">
        {adverts.map((advert) => (
          <div className="taxonomy-article-item" key={advert.id}>
            <Link to={`/article/${advert.id}`}>
              {advert._embedded &&
                advert._embedded["wp:featuredmedia"] &&
                advert._embedded["wp:featuredmedia"][0] && (
                  <img
                    src={advert._embedded["wp:featuredmedia"][0].source_url}
                    alt={advert.title.rendered}
                  />
                )}
              <h2>{advert.title.rendered}</h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="form-button-wrapper">
        <button className="shop-buttons-black" onClick={() => Navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ArticleTaxonomy;
