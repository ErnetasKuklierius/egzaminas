import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let usersDatabase = [
        {
            id: 1, username: "admin", password: "admin123"
        },

        {
            id: 1, username: "user", password: "user123"
        }
    ]
    

  
    const handleLogin = (e) => {
      e.preventDefault();

      const user = usersDatabase.find(
    (user) => user.username === username && user.password === password
      );


      if (user.username === "user") {
        navigate("/main");
      } else if (user.username === "admin") {
        navigate("/adminpanel");
      };

    };

  
    return (
        <div
          className="flex items-center justify-center w-full h-screen bg-cover bg-center"
        >
          <div className="top-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full">
            <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-80">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl font-bold">Login</h2>
              </div>
    
              {error && <p className="text-red-500 mb-4">{error}</p>}
    
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
    
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    
    export default Login;
