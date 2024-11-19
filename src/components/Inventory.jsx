import { useState } from "react";
import AnimalDataTable from "./AnimalDataTable";
import FarmerDetails from "./FarmerDetails";

export default function Inventory() {
  const [currentComponent, setCurrentComponent] = useState("farmerDetails");

  // Function to toggle between components
  const goToNextComponent = () => {
    setCurrentComponent(
      currentComponent === "farmerDetails" ? "animalDataTable" : "farmerDetails"
    );
  };

  return (
    <div>
      {/* Button to toggle components */}
      <button onClick={goToNextComponent}>
        {currentComponent === "farmerDetails"
          ? "Go to Animal Data"
          : "Go to Farmer Details"}
      </button>

      {/* Conditionally render components based on state */}
      {currentComponent === "farmerDetails" ? (
        <FarmerDetails />
      ) : (
        <AnimalDataTable />
      )}
    </div>
  );
}
