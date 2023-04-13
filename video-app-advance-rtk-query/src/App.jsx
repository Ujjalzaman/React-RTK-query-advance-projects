import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Video from "./components/pages/Video";
import Edit from "./components/pages/Edit";
import AddVideo from "./components/pages/AddVideo";

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Video/>} path="/videos/:videoId"/>
        <Route element={<Edit/>} path="/edit/:id"/>
        <Route element={<AddVideo/>} path="/add"/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
