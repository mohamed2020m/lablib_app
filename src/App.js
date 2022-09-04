import {useEffect, useRef, useCallback, useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation} from "react-router-dom";
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
import ForgetPassword from "./pages/ForgetPassword";
import NoPage from "./pages/nopage";
import Helmet from "react-helmet"

import ProtectedRoutes from './components/ProtectedRoutes';

import {refresh} from './service/refrechTokenService';

const App = () => {
  const { user} = useAuthContext();
  const intervalRef = useRef();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Get new Token
  const getNewUserToken = async () => {
    try {
        if(user){
          const res = await refresh(user.$token);
          console.log("old access token: ", user.token)
          if (res.status === 200) {
              const data = await res.json();
              localStorage.setItem('user', JSON.stringify(data));
              console.log("new access token")
          } 
          else {
            // New token didnt received.Remove the previous token and user 
            throw res.message
          }
        }
        else{
          throw "You are not logged in!"
        }
    } 
    catch (err){
      console.warn("err: ", err)
      localStorage.removeItem("user");
      // location.reload();
      setRedirectToLogin(true);
    }
  };
  // Get new token if and only if existing token is available
  const getToken = useCallback(() => {
    if (user!= null) {
      getNewUserToken();
    }
  }, []);

  // Trigger API to get a new token before token gets expired.
  useEffect(() => {
      if(user){
        console.log("changed")
        const interval = setInterval(() => getToken(), 14 * 60 * 1000); 
        intervalRef.current = interval;
        return () => clearInterval(interval);
      }
  }, [redirectToLogin, getToken]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={!user?.token ? <Login /> : <Navigate to="/home" />} />
            <Route path="/" element={!user?.token ? <Home /> : <Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
            <Route path="/categories" element={<ProtectedRoutes><Categories/></ProtectedRoutes>} />
            <Route path="/categories/:CategoryName" element={<ProtectedRoutes><Cours /></ProtectedRoutes>}/>
            <Route path="/categories/:CategoryName/cours/:CourseName" element={<ProtectedRoutes><Chapiter/> </ProtectedRoutes>}/>
            <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName" element={<ProtectedRoutes> <Labs /></ProtectedRoutes>}/>
            <Route path="categories/:CategoryName/cours/:CourseName/chapiter/:ChapiterName/lab/:LabName" element={<ProtectedRoutes> <Steps /> </ProtectedRoutes>}/>
            <Route path="/profile" element={<ProtectedRoutes> <Profile/> </ProtectedRoutes>}/>
            <Route path="/settings" element={<ProtectedRoutes><Settings /> </ProtectedRoutes>} />
            <Route path="/register" element={!user?.token ? <SignUp /> : <Navigate to="/home" />} />
            <Route path="/forgetpassword" element={!user?.token ? <ForgetPassword /> : <Navigate to="/home" />}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NoPage />} />    
        </Routes>
      </BrowserRouter>
      {
        redirectToLogin ?
        <div className="modal fade show" id="reauthonicate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">vous devez vous authentifier à nouveau</h5>
              </div>
              <div className="modal-footer">
                <a type="button" href="/login" className="btn btn-primary">réauthentifier</a>
              </div>
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
}

export default App;
