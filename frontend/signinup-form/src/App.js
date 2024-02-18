import React, { useState } from 'react';
import './App.css';

function App() {
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const BACKEND_URL = 'http://localhost:3000'; // Specify the URL of your backend server

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signInUsername, password: signInPassword })
      });
      const data = await response.json();
      console.log(data);
      // Handle response data, e.g., show success message or error
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signUpUsername, password: signUpPassword })
      });
      const data = await response.json();
      console.log(data);
      // Handle response data, e.g., show success message or error
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sign In</h5>
              <form onSubmit={handleSignInSubmit}>
                <div className="form-group">
                  <label htmlFor="signInUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="signInUsername"
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signInPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>
              <form onSubmit={handleSignUpSubmit}>
                <div className="form-group">
                  <label htmlFor="signUpUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="signUpUsername"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signUpPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="signUpPassword"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
