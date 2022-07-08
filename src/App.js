import VehicleDetails from "./pages/VehicleDetails";
// import HeroSection from "./pages/SellerHeroSection";
import VehicleListings from "./pages/VehicleListings";
// import SellerFormVehicle from "./pages/SellerFormVehicle";
// import VehicleCard from "./pages/VehicleCard";
// import FAQ from "./pages/FAQ";
// import SellerForm from "./pages/SellerForm";
import UserLogin from './pages/UserLogin'
import { Routes, Route } from "react-router-dom";
import SellerHomePage from "./pages/SellerHomePage";
import UserVehicles from "./pages/UserVehicles";
import LoggedUser from "./pages/LoggedUser";
import UserOrder from "./pages/UserOrder";
import UserFaq from "./pages/UserFaq";
import Subscription from "./pages/Subscription";
function App() {
  return (
    <Routes>
      <Route element={<SellerHomePage />} index />
      <Route element={<VehicleListings />} path="/vehiclelistings" />
      <Route element={<VehicleDetails />} path="/vehicledetails/:id" />
      <Route element={<UserLogin />} path="/UserLogin" />
      <Route element={<LoggedUser />} path="/LoggedUser" />
      <Route element={<UserVehicles />} path="/UserVehicles" />
      <Route element={<UserOrder />} path="/UserOrder" />
      <Route element={<UserFaq />} path="/UserFaq" />
      <Route element={<Subscription />} path="/Subscription" />
      
    </Routes>
  );
}

export default App;
