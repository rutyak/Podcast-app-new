import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Payment.css'; // Import your CSS file for styling

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your server for processing
      console.log('Payment method ID:', paymentMethod.id);
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className='payment-form'>
        <h2>Payment Information</h2>
        <div className="card-element-container">
          <CardElement className="card-element" />
        </div>
        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
