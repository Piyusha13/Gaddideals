import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import VehicleDetails from "./pages/VehicleDetails";
import VehicleListings from "./pages/VehicleListings";
import SellerForm from "./pages/SellerForm";
import UserLogin from "./pages/UserLogin";
import { Routes, Route, useNavigate } from "react-router-dom";
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

import { setCurrentCity } from "./store/location/location.action";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Geocode from "react-geocode";

const queryString = require("query-string");

function App() {
  const location = queryString.parse(window.location.search);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    Geocode.setApiKey("AIzaSyAELAwwgOsEByDFADInfu25LgorYeILwRI");
    Geocode.setLanguage("en");
    Geocode.setRegion("in");
    Geocode.setLocationType("ROOFTOP");

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
                default:
                  break;
              }
            }
          }

          if (!location.city) {
            dispatch(setCurrentCity("Mumbai"));
            location["city"] = "Mumbai";
            let prevUrl = queryString.stringify(location);
            navigate("?" + prevUrl);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }

    function error() {
      alert("Unable to retrieve your location!");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [dispatch]);

  return (
    <>
      <div id="google_translate_element"></div>
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
