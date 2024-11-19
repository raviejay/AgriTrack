import { useState } from "react";
import AnimalDataTable from "./AnimalDataTable";
import FarmerDetails from "./FarmerDetails";
import BarangayData from "./BarangayData";

export default function Inventory() {
  const [currentComponent, setCurrentComponent] = useState("farmerDetails");

  // Function to toggle between components
  const goToNextComponent = () => {
    if (currentComponent === "farmerDetails") {
      setCurrentComponent("animalDataTable");
    } else if (currentComponent === "animalDataTable") {
      setCurrentComponent("barangayData");
    } else {
      setCurrentComponent("farmerDetails");
    }
  };

  return (
    <div>
      {/* Button to toggle components */}
      <button onClick={goToNextComponent}>
        {currentComponent === "farmerDetails"
          ? "Go to Animal Data"
          : currentComponent === "animalDataTable"
          ? "Go to Barangay Data"
          : "Go to Farmer Details"}
      </button>

      {/* Conditionally render components based on state */}
      {currentComponent === "farmerDetails" ? (
        <FarmerDetails />
      ) : currentComponent === "animalDataTable" ? (
        <AnimalDataTable />
      ) : (
        <BarangayData />
      )}
    </div>
  );
}
