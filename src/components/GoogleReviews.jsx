import React, { useRef } from 'react';
import '../assets/GoogleReviews.css';

const reviews = [
  {
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Emily Stone',
    rating: 5,
    text: 'Amazing experience, fast delivery and great customer support!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'John Doe',
    rating: 4,
    text: 'Quality products. I will definitely shop again.',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Sophie Turner',
    rating: 5,
    text: 'Best store I’ve ordered from recently. Highly recommend!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'David Smith',
    rating: 4,
    text: 'Great service, very satisfied!',
  }
];

function GoogleReviews() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="google-reviews">
      <h2>What Our Customers Say</h2>
      <div className="reviews-container">
        <button className="scroll-button left" onClick={() => scroll('left')}>&lt;</button>
        
        <div className="reviews-scroll" ref={scrollRef}>
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <img src={review.avatar} alt={review.name} className="avatar" />
              <h4>{review.name}</h4>
              <div className="stars">{'⭐'.repeat(review.rating)}</div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')}>&gt;</button>
      </div>
    </section>
  );
}

export default GoogleReviews;
