import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

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

        <div>
          <button className="form-submit-button" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

// end of form

const Contact = () => {
  // set state for static header images
  const [headerImage, setheaderImage] = useState(null);
  // set state for contact info / text
  const [contactInfo, setContactInfo] = useState(null);

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

  // yseEffect for the contact info
  useEffect(() => {
    const infoEndpoint = `${baseUrl}/contactinfo`;
    axios
      .get(`${infoEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setContactInfo(res.data);
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

  // contact info loop / return
  const Infos = ({ infos }) => {
    if (!infos) {
      return null; // or return some other appropriate UI
    }

    const mappedInfos = infos.map((data, index) => (
      <p
        key={data.id}
        dangerouslySetInnerHTML={{ __html: data.content.rendered }}
      ></p>
    ));

    return <>{mappedInfos}</>;
  };

  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta
          name="description"
          content="Hydes Contact page displaying a paragraph of information about Hyde and general enquiries and contains a form for making contact"
        />
        <meta
          name="keywords"
          content="Contact Me, Hyde, General enquiries, name, email, message, send message"
        />
        <meta name="author" content="Hyde" />
        <meta property="og:title" content="Contact Me" />
        <meta
          property="og:description"
          content="Contact page containing a brief paragraph about Hyde and General Enquiries also includes a contact form"
        />
        <meta
          property="og:image"
          content="https://hyde-website/wp-content/uploads/2023/11/contactImage.webp"
        />
      </Helmet>

      <div className="static-hero-section">
        <HeaderImages headerImages={headerImage} index={0} />

        <div className="header-absolute">
          <h1>CONTACT ME</h1>
        </div>
      </div>

      <div id="contact-page-container">
        <Infos infos={contactInfo} />
      </div>
      <div className="commission-form">
        <h2>GENERAL ENQUIRIES</h2>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
