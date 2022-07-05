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
function App() {
  return (
    <Routes>
      <Route element={<SellerHomePage />} index />
      <Route element={<VehicleListings />} path="/vehiclelistings" />
      <Route element={<VehicleDetails />} path="/vehicledetails" />
      <Route element={<UserLogin />} path="/UserLogin" />
    </Routes>
  );
}

export default App;
