import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Main from './main';
import AdminPanel from './adminpanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<Main />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>

  );
}

export default App;
