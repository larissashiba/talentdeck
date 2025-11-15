import React from 'react'; 
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { ProfileList } from './pages/ProfileList';

import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar /> 
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/profiles" element={<ProfileList />} /> 
        </Routes>
    </BrowserRouter>
    </>
  );
} 

export default App;