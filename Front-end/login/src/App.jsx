import React from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
            

          <Route path="/login" element={ <Login />}/> 
           

          <Route path="/" element={<Navbar/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
