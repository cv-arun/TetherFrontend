import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoutes from './routes.js/protectedRoutes';
import UnprotectedRoutes from './routes.js/unprotectedRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';







function App() {

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_google_client_id}`} >
      <Provider store={store}>
        <UnprotectedRoutes />
        <ProtectedRoutes />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
