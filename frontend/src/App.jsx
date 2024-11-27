import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Register from '../components/Register';
import Login from '../components/Login';
import Payment from '../components/Payment';
import PaymentHistory from '../components/PaymentHistory';

const App = () => {
  // Retrieve token from localStorage if exists
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');

  // Handle logout: remove token from localStorage and reset state
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove the token from localStorage
    setToken(''); // Reset token state
  };

  return (
    <div>
  {!token ? (
    <>
      <div className="form-wrapper">
        <div className="form-container">
          <h1>Login</h1>
          <Login setToken={setToken} />
        </div>
        <div className="form-container">
          <h1>Register</h1>
          <Register />
        </div>
      </div>
    </>
  ) : (
    <>
          <div className="payment-wrapper">
            <div className="payment-container">
              <h3>Make a Payment</h3>
              <Payment token={token} />
            </div>
            <div className="payment-container">
              <h3>Payment History</h3>
              <PaymentHistory token={token} />
            </div>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Logout
          </button>
        </>
  )}
</div>

  
  );
};

export default App;
