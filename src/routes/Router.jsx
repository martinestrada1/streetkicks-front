import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home" 
import Login from '../components/pages/Login';
import Bids from '../components/pages/Bids';
import Register from '../components/pages/Register';
import Help from '../components/pages/Help';
import AllSneakers from '../components/pages/AllSneakers';
import ProductDetail from '../components/pages/ProductDetail';
import Page404 from '../components/pages/404';
import Reserve from '../components/pages/Reserve';
import DashboardUSers from '../components/pages/DashboardUsers';
import DashboardBids from '../components/pages/DashboardBids';
import DashboardReserves from '../components/pages/DashboardReserves';
import LoginAdmin from '../components/pages/LoginAdmin';
import Confirmation from '../components/pages/Confirmation';

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Page404/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/login/admin" element={<LoginAdmin/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/help" element={<Help/>} />
                    <Route path="/dashboard/users" element={<DashboardUSers/>} />
                    <Route path="/dashboard/bids" element={<DashboardBids/>} />
                    <Route path="/dashboard/reserves" element={<DashboardReserves/>} />
                    <Route path="/sneakers" element={<AllSneakers/>} />
                    <Route path="/sneakers/confirmation/:id" element={<Confirmation/>} />
                    <Route path="/sneaker/:id" element={<ProductDetail/>} />
                    <Route path="/bids/:id" element={<Bids/>} />
                    <Route path="/reserve/:id" element={<Reserve/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
