import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import HomePage from './Pages/Dashboard';
import ProtectedRoute from './protectedRoute';
import { LottieAnimation } from './Components/Animation';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/animation" element={<LottieAnimation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
