import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// import of images
import heroImage from "/img/home-hero-image.jpg";
import heroImage2 from "/img/hakosProduct.webp";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Article = () => {
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [taxonomies, setTaxonomies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = `${baseUrl}/adverts/${id}?_embed`;
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setAdvert(res.data);
        // Fetch taxonomies for the specific post
        fetchTaxonomies(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const fetchTaxonomies = (advertData) => {
    if (
      advertData &&
      advertData._links &&
      advertData._links["wp:term"] &&
      advertData._links["wp:term"].length > 0
    ) {
      const taxonomyEndpoint = advertData._links["wp:term"][0].href;
      axios
        .get(taxonomyEndpoint)
        .then((res) => {
          console.log(res.data);
          setTaxonomies(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Latest News</title>
        <meta
          name="description"
          content="Hydes website of a selected News Article. Shows an image, title, taxonomy links, description of the article and return to home button"
        />
        <meta
          name="keywords"
          content="Latest News, Hololive, Article, Art, image, advert"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Latest News" />
        <meta
          property="og:description"
          content="News Article page displaying a selected news article containing an image, title, taxonomy links, description, return to home button"
        />
      </Helmet>
      <div>
        {/* Render the advert details here */}
        {advert && (
          <>
            <div id="hero-image-container">
              <Swiper
                className="hero-section-swiper"
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ dynamicBullets: true }}
                loop={true}
                autoplay={{
                  delay: 6500,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
                  <div className="call-to-action-hero">
                    <h4>Fubuki Digital Bundle</h4>
                    <button
                      className="call-to-action-button"
                      onClick={() => navigate("/shop")}
                    >
                      CHECK IT OUT!
                    </button>
                  </div>
                  <img src={heroImage} alt="Fubuki artwork hero image" />
                </SwiperSlide>
                <SwiperSlide>
                  <div className="call-to-action-hero">
                    <h4>Hakos Digital Bundle</h4>
                    <button
                      className="call-to-action-button"
                      onClick={() => navigate("/shop")}
                    >
                      CHECK IT OUT!
                    </button>
                  </div>
                  <img src={heroImage2} alt="Hakos artwork hero image" />
                </SwiperSlide>
              </Swiper>
              <div className="header-absolute">
                <h1>LATEST NEWS</h1>
              </div>
            </div>

            <div className="single-article-container">
              {advert._embedded &&
                advert._embedded["wp:featuredmedia"] &&
                advert._embedded["wp:featuredmedia"][0] && (
                  <img
                    src={advert._embedded["wp:featuredmedia"][0].source_url}
                    alt={advert.title.rendered}
                  />
                )}
              {/* Display taxonomies */}
              {taxonomies.length > 0 && (
                <div>
                  {taxonomies.map((taxonomy) => (
                    <Link
                      to={`/articletaxonomy/${taxonomy.id}`}
                      key={taxonomy.id}
                    >
                      <span className="category-pill">{taxonomy.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              <h3>{advert.title.rendered}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: advert.content.rendered }}
              />

              <div className="form-button-wrapper">
                <button
                  className="shop-buttons-black"
                  onClick={() => navigate("/")}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Article;
