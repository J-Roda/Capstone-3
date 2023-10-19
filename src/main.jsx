import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProductContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { StepContextProvider } from './context/StepContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StepContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthContextProvider>
    </StepContextProvider>
  </React.StrictMode>
);
