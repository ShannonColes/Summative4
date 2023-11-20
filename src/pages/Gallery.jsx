import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

//import url
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Gallery = () => {
  // set state for static header images
  const [headerImage, setheaderImage] = useState(null);
  const [galleryImage, setgalleryImage] = useState(null);

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

  useEffect(() => {
    const galleryEndpoint = `${baseUrl}/galleryimage?_embed`;
    axios
      .get(`${galleryEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setgalleryImage(res.data);
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
      </>
    );
  };

  const GalleryImages = ({ galleryImages, index }) => {
    if (
      !galleryImages ||
      galleryImages.length === 0 ||
      index >= galleryImages.length
    ) {
      return null;
    }

    const galleryData = galleryImages[index];

    return (
      <>
        <img
          src={getFeaturedImage(galleryData)}
          alt="gallery image"
          key={galleryData.id}
        />
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta
          name="description"
          content="Hydes art gallery of recent digital illustrations"
        />
        <meta name="keywords" content="gallery, images, digital art, hyde" />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Gallery" />
        <meta
          property="og:description"
          content="Hydes Gallery of latest works"
        />
        <meta
          property="og:image"
          content="https://hyde-website/wp-content/uploads/2023/11/gallery1-scaled.webp"
        />
      </Helmet>
      <div className="static-hero-section">
        <HeaderImages headerImages={headerImage} index={1} />

        <div className="header-absolute">
          <h1>GALLERY</h1>
        </div>
      </div>
      <div className="gallery-grid-container">
        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={0} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={1} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={2} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={3} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={4} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={5} />
        </div>

        <div className="gallery-item">
          <GalleryImages galleryImages={galleryImage} index={6} />
        </div>
      </div>
    </>
  );
};

export default Gallery;
