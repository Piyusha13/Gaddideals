import VehicleDetails from "./pages/VehicleDetails";
import VehicleListings from "./pages/VehicleListings";
import SellerForm from "./pages/SellerForm";
import UserLogin from "./pages/UserLogin";
import { Routes, Route } from "react-router-dom";
import SellerHomePage from "./pages/SellerHomePage";
import UserVehicles from "./pages/UserVehicles";
import LoggedUser from "./pages/LoggedUser";
import UserOrder from "./pages/UserOrder";
import UserFaq from "./pages/UserFaq";
import Subscription from "./pages/Subscription";
import SellerHome from "./pages/SellerHome";

import VehicleCard from "./pages/VehicleCard";

import DirectSignup from "./components/DirectSignup";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Routes>
      {/* all routes here */}
      <Route element={<SellerHomePage />} index />
      <Route element={<SellerHome />} path="sellerhome" />
      <Route element={<VehicleListings />} path="vehiclelistings" />
      <Route element={<VehicleDetails />} path="/vehicledetails/:id" />
      <Route element={<UserLogin />} path="/UserLogin" />
      <Route element={<LoggedUser />} path="/LoggedUser" />
      <Route element={<UserVehicles />} path="/UserVehicles" />
      <Route element={<UserOrder />} path="/UserOrder" />
      <Route element={<UserFaq />} path="/UserFaq" />
      <Route element={<Subscription />} path="/Subscription" />

      <Route element={<VehicleListings />} path="vehiclelistings" />
      <Route element={<VehicleDetails />} path="vehicledetails" />
      <Route element={<UserLogin />} path="/UserLogin" />
      <Route element={<SellerForm />} path="/sellerform/:categoryId" />
      {/* <Route element={<SellerForm />} path="/sellerform" /> */}
      
      <Route element={<VehicleCard />} path="/VehicleCard" />
      <Route element={<DirectSignup />} path="/DirectSignup" />
      
    </Routes>
    <ToastContainer autoClose={3000}/>
    </>
  );
}

export default App;
