// /* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/myProfile';
import About from './components/about';
import NotFound from './components/notFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home title="Welcome to React" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
