import React from 'react';
import Nav from './components/Nav';
import Tags from './components/Tags';
import Videos from './components/Videos';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import VideoDetails from './components/VideoDetails';
function App() {
  return (
    <Router>
      <Nav />
      <Tags />
      <Routes>
        <Route path='/' element={<Videos />} />
        <Route path='/video/:id' element={<VideoDetails />} />
      </Routes>
      <Pagination />
      <Footer />
    </Router>
  );
}

export default App;
