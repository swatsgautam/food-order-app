import React, {useContext, useState, useRef} from 'react'
import logo from '../assets/logo.jpg'
import { FoodContext } from '../context/FoodContext';
import Cart from './Cart';

const Header = () => {
  const { cart } = useContext(FoodContext); //to use cart value from foodcontext
  const [showCart, setShowCart] = useState(false); //state variable showcart to manage the visibilty of cart with initial value to false
  const cartButtonRef = useRef(null); //Creates a reference that is attached to the cart button to get its position on the page.

  //to toggle the visibility of cart when button is clicked.
  const toggleCart = () => {
    setShowCart(prev => !prev); //toggles the showcart state (true or false) 
  };

  //variable to store the position of cart button
  const buttonPosition = cartButtonRef.current
    ? cartButtonRef.current.getBoundingClientRect()
    : { top: 0, left: 0 };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="App Logo" />
        <h1>Food Order</h1>
      </div>
      <button className="button" ref={cartButtonRef} onClick={toggleCart}>
        Cart ({cart.length})
      </button>
      {/* Conditionally render the Cart based on showCart */}
      <div className={`cart ${showCart ? 'visible' : ''}`} style={{ top: `${buttonPosition.bottom + window.scrollY}px`, left: `${buttonPosition.left}px` }}>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </header>
  );
}

export default Header
