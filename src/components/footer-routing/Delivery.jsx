import React,{useEffect} from 'react';
import '../../assets/footer-routing-styles/Delivery.css';

const deliveryInfo = [
  {
    title: 'OUR DELIVERY PARTNER',
    content: [
      "We partner with Global-e, who are a third-party service acting as your seller-on-record, for all of our international shipments.",
      <>
        After completing your purchase, you'll see the payment method is charged by{' '}
        <strong>Global-e // Graham and Brown</strong>, as such your purchase is subject to
        Global-e's terms and conditions and privacy policy (which will be clearly presented
        in checkout before you place your order).
      </>,
      "If you have any queries regarding this relationship you can contact us directly or you can contact Global-e. If you have placed an order for delivery outside of the UK, you can also track the progress of your order here.",
    ],
  },
  {
    title: 'BESPOKE MURALS',
    content: [
      "As bespoke murals are made to order, they will take up to 3 working days to be processed before being dispatched. Please allow up to 9 working days to be delivered, including processing time. Please do not opt for express delivery if other options are available. Global-e will send you tracking information during the shipment process to allow you to track your parcel during delivery.",
      <>
      <h3>CURTAINS & BLINDS</h3>
      </>,
      "As curtains and blinds are made to order, they will take up to 21 working days to be delivered. Please do not opt for express delivery if other options are available. Global-e will send you tracking information during the shipment process to allow you to track your parcel during delivery.",
    ],
  },
  {
    title: 'Will I pay import fees, duties and taxes on my order?',
    content: [
      "All delivery destinations selected outside of the UK may be subject to the local import fees, duties and taxes.",
      "These charges are levied by the importing country at the time the delivery arrives into your chosen country.",
      "All applicable charges for custom clearance will be payable by the parcel recipient if you haven't already pre-paid these fees as part of the checkout process.",
    ],
  },
  {
    title: 'Samples',
    content: [
      "We offer FREE delivery on all sample orders. Delivery can take up to 7-10 working days. Unfortunately, we cannot provide tracking information for sample orders.",
    ],
  },
  {
    title: '',
    content: [
      <>
      <strong>PLEASE NOTE:</strong> you must comply with all applicable laws and regulations of the country selected for delivery. It is your responsibility to ensure that the products ordered are permitted for delivery in your selected country. Delays may be caused if you do not accept this responsibility.
      </>
    ],
  },
  {
    title: 'Contact us',
    content: [
      "If you need any help or further information around delivery, please contact us at Graham & Brown Support.",
    ],
  },
];


const Delivery = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="delivery-wrapper">
      <h2 className="delivery-heading">DELIVERY OPTIONS</h2>

      <div className="delivery-card">
        <p>
          Please note that due to high demand, there may be a slight delay in receiving your order. Most orders are arriving just 3 days later than usual. Thank you for your patience and support!
        </p>
      </div>

      <div className="delivery-card">
        <p>
          We offer international delivery with our delivery partner Global-e, this is for all orders excluding Samples which are sent via Royal Mail.
        </p>
        <p>
          Global-e will send you tracking information during the shipment process to allow you to track your parcel during delivery. Delivery charge is dependent on the parcel size and weight and will be automatically updated in the checkout.
        </p>
      </div>

      <h2 className="delivery-heading">ADDITIONAL INFORMATION</h2>
      <div className="additional-info">
        {deliveryInfo.map((item, idx) => (
          <div className="info-block" key={idx}>
            <h3>{item.title}</h3>
            {item.content.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Delivery;
