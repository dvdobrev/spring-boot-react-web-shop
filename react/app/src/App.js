import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { Header } from './components/Header';
import { Login } from './components/Login';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Register } from './components/Register';
import { AboutUs } from './components/AboutUs';
import { Offers } from './components/Offers';
import { Shoppingcart } from './components/Shoppingcart';
import { Logout } from './components/Logout';
import { AddClothes } from './components/AddClothes';
import { ClothesProvider } from './context/ClothesContext';

const App = () => {
  return (

    <div className="App">
      <Header />

      <ClothesProvider>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </ClothesProvider>
      

      <Routes>
        <Route path="/addClothes" element={<AddClothes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/shopping-cart" element={<Shoppingcart />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>



    </div>
  );
};

export default App;