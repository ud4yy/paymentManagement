import React, { useState } from 'react';
import { getPaymentHistory } from '../services/api';

const PaymentHistory = ({ token }) => {
  const [payments, setPayments] = useState([]);
  const [fromDate, setFromDate] = useState('2024-01-01');
  const [toDate, setToDate] = useState('2024-12-31');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch payment history based on date range
  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPaymentHistory(fromDate, toDate, token);
      console.log(response.payments);
      setPayments(response.payments);
    } catch (err) {
      console.error('Error fetching payment history', err);
      setError('Failed to fetch payment history');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to trigger fetching
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    fetchPayments();  // Call the fetch function when form is submitted
  };

  return (
    <div>
      {/* <h3>Payment History</h3> */}
      
      {/* Form for selecting date range */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Payment History'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {payments.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment.id}>
              {payment.recipientName} - {payment.amount} - {payment.reason}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments found</p>
      )}
    </div>
  );
};

export default PaymentHistory;
