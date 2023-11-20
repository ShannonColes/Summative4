import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

// import of images
import paperBackground from "/img/gritty-background.webp";

//import url
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  //loading state
  const [loading, setLoading] = useState(true);
  // set state of adverts / news articles
  const [advert, setAdvert] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [popularImage, setPopularImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const heroEndpoint = `${baseUrl}/heroimage?_embed`;
    axios
      .get(`${heroEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setHeroImage(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const popularEndpoint = `${baseUrl}/popularimage?_embed`;
    axios
      .get(`${popularEndpoint}`)
      .then((res) => {
        setPopularImage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const advertEndpoint = `${baseUrl}/adverts?_embed`;
    axios
      .get(`${advertEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setAdvert(res.data);
        setLoading(false);
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

  if (loading) {
    return <>Loading...</>;
  }

  const HeroImages = ({ heroImages, index }) => {
    if (!heroImages || heroImages.length === 0 || index >= heroImages.length) {
      return null;
    }

    const imageData = heroImages[index];

    return (
      <div className="hero-section-swiper" key={imageData.id}>
        <div className="call-to-action-hero">
          <h4>{imageData.title.rendered}</h4>
          <button
            className="call-to-action-button"
            onClick={() => navigate("/shop")}
            dangerouslySetInnerHTML={{
              __html: imageData.excerpt.rendered,
            }}
          ></button>
        </div>
        <img
          src={getFeaturedImage(imageData)}
          alt="Hydes artwork swiperslides"
        />
      </div>
    );
  };

  const PopularImages = ({ popularImages, index }) => {
    if (
      !popularImages ||
      popularImages.length === 0 ||
      index >= popularImages.length
    ) {
      return null;
    }

    const popularData = popularImages[index];

    return (
      <>
        <img
          src={getFeaturedImage(popularData)}
          alt="gallery image"
          key={popularData.id}
        />
      </>
    );
  };

  const Adverts = ({ adverts }) => {
    if (!adverts) {
      return null; // or return some other appropriate UI
    }

    const mappedAdverts = adverts.map((data, index) => (
      <Link to={`/article/${data.id}`} key={data.id}>
        <div id="news-grid-item">
          {/* gird image */}
          <img
            className="news-image"
            src={getFeaturedImage(data)}
            alt="Image display of the advert"
          />
          {/* hero advert and text */}
          <div id="news-text">
            <h4>{data.title.rendered}</h4>
            <p dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}></p>
          </div>
        </div>
      </Link>
    ));

    return <>{mappedAdverts}</>;
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Hydes website Home page displaying popular works latest news and a link to contact him "
        />
        <meta
          name="keywords"
          content="Home, popular works, latest news, contact, Hyde"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Home page of Hydes website with popular works latest news and a contact link"
        />
        <meta
          property="og:image"
          content="https://hyde-website/wp-content/uploads/2023/11/F2a8q1Oa8AAHPFK-scaled.webp"
        />
      </Helmet>

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
            {loading ? (
              <p>Loading...</p>
            ) : (
              <HeroImages heroImages={heroImage} index={0} />
            )}
          </SwiperSlide>

          <SwiperSlide>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <HeroImages heroImages={heroImage} index={1} />
            )}
          </SwiperSlide>

          <SwiperSlide>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <HeroImages heroImages={heroImage} index={2} />
            )}
          </SwiperSlide>
        </Swiper>
        <div className="header-absolute">
          <h1>POPULAR WORKS</h1>
        </div>
      </div>

      {/* end of swiper */}

      <div className="display-image-container">
        <div className="image-display-one">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            effect={"fade"}
            speed={3000}
            loop={true}
            autoplay={{
              delay: 6500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={0} />
            </SwiperSlide>
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={1} />
            </SwiperSlide>
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={2} />
            </SwiperSlide>
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={3} />
            </SwiperSlide>
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={4} />
            </SwiperSlide>
            <SwiperSlide>
              <PopularImages popularImages={popularImage} index={5} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div id="home-news-container">
        <div className="paper-background">
          <img src={paperBackground} alt="paper gritty background image" />
        </div>
        <h2>Latest News</h2>
        <div id="news-grid-container">
          {loading ? <p>Loading...</p> : <Adverts adverts={advert} />}
        </div>
      </div>

      <div id="home-contact-section">
        <h2>Contact</h2>
        <p>
          For business inquiries, I accept work for games, light novels,
          illustration books, exhibitions, album/EP art, music videos, official
          merch/goods and promotional art. ​ Please provide the following in
          your email Project Name, Production Content, Schedule, and Budget
        </p>
        <div className="button-wrapper">
          <button
            className="contact-link-button"
            onClick={() => navigate("/contact")}
          >
            CONTACT ME HERE
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
