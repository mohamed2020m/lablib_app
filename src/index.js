import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import {AuthContextProvider} from './context/AuthContext';
import './css/bootstrap.min.css'
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Layout>
        <App />
      </Layout>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
