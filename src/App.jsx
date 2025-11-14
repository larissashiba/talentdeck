import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';           
import ProfileList from './pages/ProfileList';     
import ProfileDetail from './pages/ProfileDetail'; 

function App() {
  return (
    <>
      <Navbar /> 
      <main className="container mx-auto p-4"> 
        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;