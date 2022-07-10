import truckImg from "../assets/trucks1.png";
import locationIcon from "../assets/location.png";
import "./vehiclecard.styles.css";
import axios from "axios";
import Constant from "../constants";
import React, {useState,useEffect} from "react";






const VehicleCard = () => {


  const [vehicleData,setvehicleData]=useState("");
  const [vehicleName,setvehicleName]=useState("");

  const getMyVehicleDetails = () => {
    axios.get( "https://gaddideals.brokerinvoice.co.in/api/vehicle/my_vehicles", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjk2N2FjOTAyMzkzMDVjYjUzODY4NSIsImlhdCI6MTY1NjMxNzkzNywiZXhwIjoxNzQyNzE3OTM3fQ.MM37vEl5KDYIcaGaN3xWno-ea-OBxB547u80Ts1149E",
        },
      }
    )
     .then((res) => {
      
      res.data.getMyVehicle.forEach((item,index)=>{
        // console.log(item.model.name);
        
       setvehicleData(item);
        setvehicleName(item.model);
      })
      });
  };
  
  useEffect(() => {
    getMyVehicleDetails();
  });


  return (
    <div className="vehicle-card-container">
      <div className="card">
        <div className="card-img-wrapper">
          <img src={truckImg} alt="truck" />
        </div>
        <div className="card-info">
          <div className="card-info-header">
            <div className="card-info-title">
              <h1>{vehicleName.name}</h1>
              <div className="location">
                <img src={locationIcon} alt="location icon" />
                <span>{vehicleData.city}</span>
              </div>
            </div>

            <div className="card-publish-review">
              <div className="review">
                <strong>Under Review</strong>
              </div>
              <span>(Uploaded on Jun 01,2022)</span>
            </div>
          </div>

          <div className="card-price">
            <h3>₹{vehicleData.selling_price} </h3>
          </div>

          <div className="card-stats">
            <div className="stat">
              <span>{vehicleData.km_driven} km</span>
            </div>

            <div className="stat">
              <span>{vehicleData.no_of_owner} Owner</span>
            </div>

            <div className="stat">
              <span>{vehicleData.no_of_tyre} tyres </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
