import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);
    
    const newFoodArray = [...foods, newFood]; //clone foods into a new array and adds newFood to the end of array 
    console.log(newFoodArray)
    setFoods(newFoodArray) //sets the new state to the new object 'newFoodArray'

  }

  //This function does not conflict with the above function as the click is associated with the li element and not the button.
  //The current state will occur as normal updating with the latest data
  // function handleLiClick(id) { //removes the li element when clicked based on id
  //   const arrayAfterRemove = foods.filter((food) => food.id !== id); //fliter out the associated id with the li that was clicked
  //   setFoods(arrayAfterRemove);
  // }

  //This function does not conflict with the above function as the click is associated with the li element and not the button.
  //The current state will occur as normal updating with the latest data
  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) { //when the food id is a match with the clicked li
        return {
          ...food, //duplicate the food array
          heatLevel: food.heatLevel + 1, //increase the heatlevel key's value (of the new object) by 1 when clicked
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  //Second state Variable
  const [filterBy, setFilterBy] = useState("All");

  //function for the second state
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  //function to display what was selected. This uses both states. The first state being the current object of all the food.
  //The second state will filter the current list based on selection on the first state.
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>


    <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
    </select>

    <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>

    </div>

    
  );
}

export default SpicyFoodList;
