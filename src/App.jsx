// src/App.jsx
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieSearch from './components/MovieSearch';

function App() {
  return (
    <>
    <div className="app-container">
      <Header />
      <MovieSearch />    
      <Footer />
    </div>
    </>
  );
}

export default App;
