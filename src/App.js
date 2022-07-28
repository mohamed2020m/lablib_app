import {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import './css/App.css';

import Categories from "./pages/Categories";
import Cours from "./pages/Courses";
import Chapiter from "./pages/Chapiters";
// import Steps from "./pages/stepsList";
import Labs from "./pages/Labs";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from "./pages/About";
import NoPage from "./pages/nopage";

const App = () => {
  useEffect(() => {

  })
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="users" element={<Users />} /> */}
            <Route path="/categories" element={<Categories/>} />
            <Route path="/categories/:CategoryName" element={<Cours />} />
            <Route path="/categories/:CategoryName/cours/:CourseName" element={<Chapiter/>} />
            <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName" element={<Labs />} />
            {/* <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName/lab/LabName" element={<Steps />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NoPage />} />    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
