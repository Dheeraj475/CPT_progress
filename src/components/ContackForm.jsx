import React from 'react';
import '../assets/ContackForm.css';

function ContackForm() {
  return (
    <section className="sustainability-section">
      <div className="sustainability-image">
        <img
          src="https://picsum.photos/id/1018/800/600"
          alt="Wall art scenery"
        />
      </div>
      <div className="sustainability-content">
        <h4>Going Green</h4>
        <h2>SUSTAINABILITY<br />REPORT</h2>
        <p>
          We are an environmentally friendly, carbon-neutral business. Not only that,
          we have a plan in development to make us Carbon Zero within the decade.
        </p>
        <button className="read-more">READ MORE</button>
      </div>
    </section>
  );
}

export default ContackForm;
