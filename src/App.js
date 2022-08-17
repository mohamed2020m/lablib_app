import {useEffect} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext'
import './css/App.css';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Categories from "./pages/Categories";
import Cours from "./pages/Courses";
import Chapiter from "./pages/Chapiters";
import Steps from "./pages/Step";
import Labs from "./pages/Labs";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Contact from './pages/Contact';
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import About from "./pages/About";
import NoPage from "./pages/nopage";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={!user ? <Home /> : <Navigate to="/home" />} />
            <Route path="/home" element={user ? <Dashboard /> : <Navigate to="/" />} />
            {/* <Route path="users" element={<Users />} /> */}
            <Route path="/categories" element={user ? <Categories/> : <Navigate to="/login" />} />
            <Route path="/categories/:CategoryName" element={user ? <Cours /> : <Navigate to="/login" />} />
            <Route path="/categories/:CategoryName/cours/:CourseName" element={user ? <Chapiter/> : <Navigate to="/login" />} />
            <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName" element={user ? <Labs />: <Navigate to="/login" />} />
            <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName/lab/:LabName" element={user ? <Steps /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/settings" element={user ? <Settings /> :<Navigate to="/login" />} />
            <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={!user ? <SignUp /> : <Navigate to="/home" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NoPage />} />    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
