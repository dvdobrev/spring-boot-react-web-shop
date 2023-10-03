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
import { Itemdetails } from './components/ItemDetails';
import { EditItem } from './components/EditItem';
import { AdminGuard } from './components/routGuards/AdminGuard';
import { LoginGuard } from './components/routGuards/LoginGuard';
import { RouteGuard } from './components/routGuards/RouteGuard';

const App = () => {
    return (

        <UserProvider>
            <div className="App">
                <Header />

                <ClothesProvider>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/clothes/details/:itemId" element={<Itemdetails />} />
                        <Route path="/clothes/edit/:itemId" element={<EditItem />} />
                    </Routes>

                </ClothesProvider>


                <Routes>

                    <Route element={<AdminGuard />}>
                        <Route path="/addClothes" element={<AddClothes />} />
                    </Route>


                    <Route element={<LoginGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<RouteGuard />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/shopping-cart" element={<Shoppingcart />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>

                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/offers" element={<Offers />} />


                </Routes>

            </div >

        </UserProvider>
    );
};

export default App;