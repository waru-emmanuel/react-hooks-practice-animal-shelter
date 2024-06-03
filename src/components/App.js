import React, { useState, useEffect, useCallback } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const fetchPets = useCallback(() => {
    let url = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, [filters]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets,filters]); // Only depend on filters

  const onChangeType = (type) => {
    setFilters({ type });
  };

  const onFindPetsClick = () => {
    fetchPets();
  };

  const onAdoptPet = (petId) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;














//Placing the useEffect in the App component is generally a better approach when the data needs to be shared or manipulated by multiple components. 
//It allows for a more centralized state management and easier implementation of features that require interaction between different parts of the app. 
//On the other hand, if the data is only relevant within a single component, fetching it locally in that component can simplify your code.

// the useEffect hook will re-run whenever either fetchPets or filters changes.
//However, you should be aware that including functions in the dependency array can lead to unnecessary re-renders. 
//To avoid this, you can use the useCallback hook to memoize the fetchPets function.
//Now, fetchPets will only be recreated when filters changes, and it will not cause unnecessary re-renders.