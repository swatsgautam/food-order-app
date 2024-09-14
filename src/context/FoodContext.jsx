import React, {createContext, useState, useEffect} from 'react'


export const FoodContext = createContext(); //Creates a context object, used to provide & consume data related to food across components


const FoodProvider = ({ children }) => { //functional component with children as props, provide context values to its child components
  
  const [meals, setMeals] = useState([]); // meal-state variable (holds available meals), setmeals- function to update the state 
  const [cart, setCart] = useState([]); //hold the items added to the shopping cart

  useEffect(() => {
    const fetchMeals = async () => { // asynchronous function to fetch meal data from server
      const response = await fetch('http://localhost:3000/meals'); //get req to endpoint to retrieve meal data
      const data = await response.json(); //parses JSON response into JS object
      setMeals(data); // Updates meal state with fetched data
    };
    fetchMeals(); // calls the function
  }, []); // empty array dependency- means the effect runs only once when components mount


  const addToCart = (meal) => {
    setCart((prevCart) => { //updates the cart state based on prevstate
      const existingMeal = prevCart.find((item) => item.id === meal.id); // checks if meal already exist
      if (existingMeal) {
        return prevCart.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item //updates the quantity of existing meal
        );
      } else {
        return [...prevCart, { ...meal, quantity: 1 }]; //add new meal in cart with initial quantity of 1
      }
    });
  };


  //to remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };


  //to update quantity of meal in cart
  const updateQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };


  //asynchronous function to submit an order, takes orader array as an argument
  const placeOrder = async (order) => {

    //object with details of order
    const orderData = {  
      items: order,  // Items in the cart
      customer: {
        email: 'customer@example.com',  // Placeholder email for now
        name: 'Customer Name',  // Placeholder name
        street: 'Customer Street',
        'postal-code': '12345',
        city: 'Customer City',
      }
    };
    try {
      const response = await fetch('http://localhost:3000/orders', { //sends post request to URL with orderdatain req body
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //specifies the request body is in JSON format
        },
        body: JSON.stringify({ order: orderData }), //converts the object to JSON string and sets it as req body
      });

      if (!response.ok) {
        throw new Error('Could not place order.');
      }

      setCart([]);  // Clear cart after successful order
      return true;  // Return success to indicate that order was successful
    } catch (error) {
      console.error('Error placing order:', error);
      return false;  // Return failure to indicate order failed
    }
  };

  
  return (
    <FoodContext.Provider value={{  meals, cart, addToCart, removeFromCart, updateQuantity, placeOrder }}>
      {children}
    </FoodContext.Provider>
  )
}

export default FoodProvider;
