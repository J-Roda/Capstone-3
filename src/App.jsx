import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useProductsContext } from './hooks/useProductsContext';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShowProduct from './pages/ShowProduct';
import MultiStepProgressBar from './components/MultiStepProgressBar';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

            {/* <Route path="/test" element={<MultiStepProgressBar steps={2} />} /> */}

            <Route path="/product/:productId" element={<ShowProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
