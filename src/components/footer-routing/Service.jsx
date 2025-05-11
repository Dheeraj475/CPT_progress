import React from 'react';
import '../../assets/footer-routing-styles/Service.css';

const serviceData = [
  {
    title: 'WALLPAPER SAMPLES',
    description:
      'We know that viewing wallpaper on a screen can be difficult to do, and that many of our wallpapers have a texture as well. So, to help make your decision as easy as possible, we offer a sampling service on all our wallpapers.',
    image:
      'https://images.pexels.com/photos/4386401/pexels-photo-4386401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    button: 'CHOOSE YOUR DESIGN',
    reverse: false,
  },
  {
    title: 'MURAL SAMPLES',
    description:
      'With so many choices of design and finishes, we want to ensure you can find the perfect mural for your home before you commit. That’s why we offer mural sample packs that include one sheet of your chosen design in every finish, so you can exactly find the right design and paper finish for you.',
    image:
      'https://images.pexels.com/photos/6964074/pexels-photo-6964074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    button: 'CHOOSE YOUR DESIGN',
    reverse: true,
  },
  {
    title: 'PEEL & STICK',
    description:
      'Our real peel & stick paint swatches are made from real paint in our Raincoat Ultra Durable Matt Emulsion for 100% colour accuracy. You can try out our colours in any room before fully committing.',
    image:
      'https://images.pexels.com/photos/6936145/pexels-photo-6936145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    button: 'CHOOSE YOUR COLOUR',
    reverse: false,
  },
  {
    title: 'PAINT TESTER POTS',
    description:
      'Our 100ml sample pots are available on selected colours in our ultra-durable emulsion and not only let you trial your choice in real light but also provide enough paint to cover a decent area for confident decisions.',
    image:
      'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    button: 'CHOOSE YOUR COLOUR',
    reverse: true,
  },
  {
    title: 'MURAL SAMPLES',
    description:
      'With so many choices of design and finishes, we want to ensure you can find the perfect mural for your home before you commit. That’s why we offer mural sample packs that include one sheet of your chosen design in every finish, so you can exactly find the right design and paper finish for you.',
    image:
      'https://images.pexels.com/photos/6964074/pexels-photo-6964074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    button: 'CHOOSE YOUR DESIGN',
    reverse: false,
  },
];

const faqs = [
  {
    question: "HOW MUCH DO SAMPLES COST?",
    answers: [
      "Wallpaper Samples are charged at ₹130.00 per small (21 x 30cm) sample and ₹255.00 per large (50 x 50cm) sample.",
      "Our tester pots are charged at ₹630.00 per 100ml pot.",
      "Peel & Stick samples are charged at ₹190.00 and curtain and blind samples are charged at ₹130.00."
    ]
  },
  {
    question: "HOW MUCH DOES DELIVERY COST?",
    answers: [
      "All samples and tester pots cost a fixed delivery fee of ₹245.00. You can find out more about our sample delivery service here."
    ]
  },
  {
    question: "WHICH PRODUCTS CAN I SAMPLE?",
    answers: [
      "Every current Graham & Brown Wallpaper is available as a small (21 x 30cm) and large (50 x 50cm) sample.",
"Our 100ml paint tester pots are available across selected colours and our peel & stick samples are available across our entire range of colours.",
"Curtain and blinds samples are available across our full range. For roller blinds you also have the option of either a blackout, light filtering or waterproof finish. As these are different substrates with different properties the samples may vary between finish, meaning it is important to order the correct sample for the product you desire.",
<>
<h3>PLEASE NOTE:</h3>
</>,
"If you are interested in both curtains and roman blinds, you would only need to order one sample (not one of each) as they are identical. When you order either a curtain or a roman blind sample, you will receive an A5 fabric piece without the lining."
    ]
  },
  {
    question: "WHERE CAN I BUY SAMPLES AND TESTER POTS?",
    answers: [
      "You can purchase your wallpaper, fabric, peel & stick samples, mural sample packs and paint tester pots right here on our website with a fixed delivery fee of ₹‌245.00. Simply look out for the ‘order a sample’ button."
    ]
  },
  {
    question: "WHAT SIZE DO SAMPLES COME IN?",
    answers: [
      "Our wallpaper samples are currently available in two sizes: small (30 x 21cm) and large (50 x 50cm).",
      "Our paint tester pots are available in 100ml pots.",
      "Our peel & stick paint samples and curtain and blind samples are all standard A5 size – 148 x 210 mm."
    ]
  },
  {
    question: "CAN I PURCHASE TESTER POTS IN ANY FINISH?",
    answers: [
      "Tester pots are available in our Matt Emulsion finish. Please note that we recommend purchasing a tester pot or peel & stick sample before moving to a full tin because all our paints are mixed to order therefore, we do not accept returns."
    ]
  }


];

const sampleTips = [
  {
    title: "Move them around!",
    text: `Light massively affects the colour, so it’s vital that you move your samples around the room.

You can create your own moveable paint sample with your tester pot by simply painting on a sheet of paper or card.`
  },
  {
    title: "Next to your key pieces.",
    text: `Try your samples next to the furniture or features you're keeping. It'll help you decide faster.`
  },
  {
    title: "Build a moodboard.",
    text: `It’s fun and gives you clarity. Match samples with ideas and key colours all in one place.`
  }
];


const testimonials = [
  {
    quoteStart: "Brilliant",
    quoteMain: "SERVICE FROM START TO FINISH. SAMPLE ARRIVED QUICKLY AS DID PAPER!",
    quoteItalic: "Top quality",
    location: "NICKYO, CHESHIRE",
    stars: 5,
  },
  {
    quoteMain: "BOUGHT ONLINE,",
    quoteItalicStart: "great",
    quoteMiddle: "CUSTOMER SERVICE WITH SAMPLES.",
    quoteItalicEnd: "Quick delivery",
    location: "JAYNERO BERTS, YORKSHIRE",
    stars: 5,
  },
  {
    quoteMain: "SAMPLES & ORDER WERE",
    quoteItalicStart: "easy to get",
    quoteMiddle: "AND SHIPPED",
    quoteItalicEnd: "promptly",
    location: "176, DELAWARE",
    stars: 5,
  }
];


const Service = () => {
  return (
    <>
    <section className="service-section">
      <div className="service-header">
        <h1>SAMPLE SERVICE</h1>
        <p>
          With so many wallpapers, murals, paints and soft furnishings to choose from, we understand
          that it can be difficult finding the right design and colour to suit your space. So, to help you
          make that positive step in redecorating your home, we offer a sample service across our full
          range of products.
        </p>
      </div>

      {serviceData.map((item, index) => (
        <div
          key={index}
          className={`service-block ${item.reverse ? 'reverse light-bg' : ''} ${
            !item.reverse ? 'light-bg' : ''
          }`}
        >
          <div className="service-image">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
          <div className="service-text">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
        </div>
      ))}
    </section>

<hr className="title-border"/>

<section className="faq-section">
  <h2 className="faq-title">SAMPLE – FAQs</h2>
  {faqs.map((faq, i) => (
    <div className="faq-card" key={i}>
      <h3>{faq.question}</h3>
      {faq.answers.map((text, j) => <p key={j}>{text}</p>)}
    </div>
  ))}
</section>

  <hr className="divider" />
<section className="sample-tips-section">
  <h2 className="sample-tips-title">OUR SAMPLE TIPS FOR YOU</h2>
  <div className="tips-container">
    {sampleTips.map((tip, index) => (
      <div className="tip-card" key={index}>
        <h3><em>{tip.title}</em></h3>
        <p>{tip.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
      </div>
    ))}
  </div>
</section>
  <hr className="divider" />


<section className="testimonials-section">
  <div className="testimonials-wrapper">
  {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-quote">
              {t.quoteStart && <strong>{`“${t.quoteStart}`}</strong>}{" "}
              {t.quoteMain}{" "}
              {t.quoteItalic && <span className="quote-italic">{t.quoteItalic}”</span>}
              {!t.quoteItalic && t.quoteItalicStart && (
                <>
                  <span className="quote-italic"> {t.quoteItalicStart}</span> {t.quoteMiddle}
                  <span className="quote-italic"> {t.quoteItalicEnd}”</span>
                </>
              )}
            </p>
            <div className="testimonial-location">{t.location}</div>
            <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
          </div>
        ))}
  </div>
</section>

<div className="testimonials-footer">
  If you have any further questions, we have a dedicated Customer Service team who are willing and happy to help.
</div>

</>
  
  );
};

export default Service;
