import React from 'react';
import Nav from './components/Nav';
import Aside from './components/Aside';
import Posts from './components/Posts';
import {
  BrowserRouter,
  Routes,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import PostDetail from './components/PostDetail';
const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<Posts />} path='/'/>
        <Route element={<PostDetail />} path='/post/:id'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App