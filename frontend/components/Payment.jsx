import React, { useState } from 'react';
import { createPayment } from '../services/api';
import './Payment.css'; // Import the CSS file

const Payment = ({ token }) => {
  const [paymentData, setPaymentData] = useState({
    recipientName: '',
    amount: 0,
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPayment(paymentData, token);
      console.log('Payment successful', response);
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="recipientName"
        placeholder="Recipient Name"
        value={paymentData.recipientName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={paymentData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="reason"
        placeholder="Reason"
        value={paymentData.reason}
        onChange={handleChange}
        required
      />
      <button type="submit">Make Payment</button>
    </form>
  );
};

export default Payment;
