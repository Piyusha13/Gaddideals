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
import "../src/App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Geocode from "react-geocode";

function App() {
  Geocode.setApiKey("AIzaSyBokh77ocsW0ene-vrX80v1Wd5QUj64pSw");
  Geocode.setLanguage("en");
  Geocode.setRegion("in");
  Geocode.setLocationType("ROOFTOP");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(latitude, longitude);
  }

  function error() {
    console.log("Unable to retrieve location");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

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
        <Route element={<UserLogin />} path="/UserLogin" />
        <Route element={<SellerForm />} path="/sellerform/:categoryId" />
        <Route element={<VehicleCard />} path="/VehicleCard" />
        <Route element={<DirectSignup />} path="/DirectSignup" />
      </Routes>
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default App;
