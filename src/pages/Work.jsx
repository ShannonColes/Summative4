import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

// import images
import paperBackground from "/img/gritty-background.webp";
import fubukiBust from "/img/commbust.webp";
import fubukiHalf from "/img/commhalf.webp";
import fubukiFull from "/img/commfull.webp";

//import url
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const ContactForm = () => {
  // state for the form submission
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // set states for in user input details / values
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // object for our form - append form data to it so we can send it
    const testForm = new FormData();
    testForm.append("Body-type", selectedBodyType);
    testForm.append("Your-name", name);
    testForm.append("Your-email", email);
    testForm.append("Your-message", message);

    //axios call
    //first argument is the endpoint, second is the form data:
    axios
      .post(formEndpoint, testForm, {
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  //conditionals - if submitted is algud or if error shows up
  if (submitted) {
    return (
      <>
        <h3>Thank you for your message</h3>
        <p>We'll be in touch soon </p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error!</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    );
  }

  //form to be returned
  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        {/* Body type selection */}
        <label htmlFor="bodyType">Commission Type</label>
        <div>
          <select
            id="bodyType"
            value={selectedBodyType}
            onChange={(e) => setSelectedBodyType(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="Bust-Up">Bust-Up</option>
            <option value="Half Body">Half Body</option>
            <option value="Full Body">Full Body</option>
          </select>
        </div>

        {/* Name input */}
        <label htmlFor="name">Name</label>
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        {/* email input */}
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        {/* Message input */}
        <label htmlFor="message">Message</label>
        <div>
          <textarea
            className="message-input"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
        </div>

        <div className="form-button-wrapper">
          <button className="form-submit-button" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

// end of form
const Work = () => {
  // set state for static header images
  const [headerImage, setheaderImage] = useState(null);
  // state for the commission price information
  const [comPrice, setComPrice] = useState(null);

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

  // useEffect for commission price info
  useEffect(() => {
    const comEndpoint = `${baseUrl}/commissionprice`;
    axios
      .get(`${comEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setComPrice(res.data);
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

  const ComPrices = ({ comPrices, index }) => {
    if (!comPrices || comPrices.length === 0 || index >= comPrices.length) {
      return null;
    }

    const comData = comPrices[index];

    console.log("comData:", comData);

    return (
      <>
        <h4 key={comData.id}>{comData.title.rendered}</h4>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Work</title>
        <meta
          name="description"
          content="Hydes website work page showing Terms of service commission types and a commission form"
        />
        <meta
          name="keywords"
          content="Work, Lets work together, terms of service, commission info, commission types, commission form"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Work" />
        <meta
          property="og:description"
          content="Work page containing terms of service commission info and a commission form"
        />
        <meta
          property="og:image"
          content="https://hydes-website/img/commfull.webp"
        />
      </Helmet>

      <div className="static-hero-section">
        <HeaderImages headerImages={headerImage} index={3} />

        <div className="header-absolute">
          <h1>COMMISSION INFO</h1>
        </div>
      </div>
      <div id="commission-info-section">
        <h2>Terms of Service</h2>
        <p>
          To keep things smooth and enjoyable for everyone, I have got a few
          ground rules and expectations outlined in my Terms of Service. Please
          make sure you have read and understand the requirements before
          proceeding any further.
        </p>

        <div className="button-wrapper">
          <button className="contact-link-button">Terms of Service</button>
        </div>

        <h4>Important Notice</h4>

        <p>
          I sometimes post the commissioned artwork on my Twitter (in lower
          quality)
        </p>
        <p>
          It may take weeks or even months before I start working on the 2nd-4th
          commissioner as I do not draw multiple artworks simultaneously
        </p>
      </div>
      <div id="commission-price-section">
        <div className="paper-background">
          <img src={paperBackground} alt="paper gritty background image" />
        </div>
        <h2>COMMISSION TYPES</h2>
        <div id="commission-grid-container">
          <div className="commission-item">
            <ComPrices comPrices={comPrice} index={2} />

            <img src={fubukiBust} alt="Fubuki bust up reference" />
          </div>
          <div className="commission-item">
            <ComPrices comPrices={comPrice} index={1} />
            <img src={fubukiHalf} alt="Fubuki half body reference" />
          </div>
          <div className="commission-item">
            <ComPrices comPrices={comPrice} index={0} />
            <img src={fubukiFull} alt="Fubuki full body reference" />
          </div>
        </div>
        <p>Backgrounds: $50 to $100 (depends on the complexity)</p>
      </div>

      <div className="commission-form">
        <h2>COMMISSION FORM</h2>
        <ContactForm />
      </div>
    </>
  );
};

export default Work;
