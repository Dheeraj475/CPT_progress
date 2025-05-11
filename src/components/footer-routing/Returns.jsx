import React from 'react';
import '../../assets/footer-routing-styles/Returns.css';

const Returns = () => {
  return (
    <section className="returns-container">
      <h1 className="returns-title">INTERNATIONAL RETURNS</h1>

      <p className="returns-text">
        To request a return, please use the below link to our Returns Portal within 30 days of receipt of goods. 
        To do this you'll need the Order ID and the email address used to place the original order, and then you can follow the instructions.
      </p>

      <p className="returns-text center">
        <a href="#" className="returns-link">Start my return</a>
      </p>

      <p className="returns-text">
        You will then be able to print out the pre-paid returns label send the package back to us in the original packaging, 
        unopened, undamaged and in a saleable condition. Note that we cannot offer free returns, and the postage cost will 
        be deducted directly from the refund.
      </p>

      <p className="returns-text">
        Please Note: that we are unable to accept returns for any Curtains, Blinds, Paint (including Tester Pots), Wallpaper 
        Samples and Bespoke Mural orders. As these items are made to order, please <a href="#" className="returns-link">contact us</a> 
        and we can let you know the best way to dispose of these items.
      </p>

      <div className="returns-box">
        <p className="returns-box-text">
          Unfortunately we are unable to accept <span className="highlight">returns for the following products:</span>
        </p>
        <ul className="returns-list">
          <li>PAINT</li>
          <li>WALLPAPER SAMPLES</li>
          <li>PAINT SAMPLES</li>
          <li>BESPOKE MURALS</li>
          <li>CURTAINS</li>
          <li>BLINDS</li>
        </ul>
      </div>
    </section>
  );
};

export default Returns;
