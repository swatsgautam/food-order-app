import React, {useContext} from 'react'
import { FoodContext } from '../context/FoodContext'

const Meals = () => {
    const {meals, addToCart} = useContext(FoodContext) //meals- list of meals available, addtocart is function to add meal in cart

  return (
    <ul id='meals'>
    {meals.map((meal) => (
      <li key={meal.id} className="meal-item">
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h1>{meal.name}</h1>
        <p className="meal-item-description">{meal.description}</p>
        <p className="meal-item-price">${meal.price}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={() => addToCart(meal)}>Add to Cart</button>
        </div>
      </li>
    ))}
  </ul>
  )
}

export default Meals
