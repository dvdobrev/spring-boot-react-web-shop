import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { Header } from './components/Header';
import { Login } from './components/profile/Login';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ClothesProvider } from './context/ClothesContext';
import { Home } from './components/Home';
import { Register } from './components/profile/Register';
import { AboutUs } from './components/AboutUs';
import { Offers } from './components/Offers';
import { Shoppingcart } from './components/shoppingCart/Shoppingcart';
import { Logout } from './components/profile/Logout';
import { AddClothes } from './components/items/AddClothes';
import { Itemdetails } from './components/items/ItemDetails';
import { EditItem } from './components/items/EditItem';
import { AdminGuard } from './components/routGuards/AdminGuard';
import { LoginGuard } from './components/routGuards/LoginGuard';
import { RouteGuard } from './components/routGuards/RouteGuard';
import { PageNotFound } from './components/PageNotFound';
import { Profile } from './components/profile/Profile';
import { EditProfile } from './components/profile/EditProfile';
import { AddAddress } from './components/address/AddAddress';
import { AddressProvider } from './context/AddressContext';
import { EditAddress } from './components/address/EditAddress';
import { Filter } from './components/items/Filter';

const App = () => {
    return (

        <UserProvider>
            <div className="App">

                <ClothesProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/filter" element={<Filter />} />
                        <Route path="/clothes/details/:itemId" element={<Itemdetails />} />
                        <Route path="/clothes/edit/:itemId" element={<EditItem />} />
                        <Route element={<AdminGuard />}>
                            <Route path="/addClothes" element={<AddClothes />} />
                        </Route>

                    </Routes>
                </ClothesProvider>

                <Routes>

                    <Route path="/pageNotFound" element={<PageNotFound />} />

                    <Route element={<LoginGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                </Routes>

                <AddressProvider>
                    <Routes>
                        <Route element={<RouteGuard />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/shoppingCart" element={<Shoppingcart />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/profile/edit" element={<EditProfile />} />
                            <Route path="/address/edit/:addressId" element={<EditAddress />} />
                            <Route path="/addAddress" element={<AddAddress />} />
                        </Route>
                    </Routes>
                </AddressProvider>

                <Routes>
                    <Route path="/about" element={<AboutUs />} />
                    {/* <Route path="/offers" element={<Offers />} /> */}
                </Routes>

            </div >

        </UserProvider >
    );
};

export default App;