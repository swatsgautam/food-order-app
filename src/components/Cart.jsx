import React, { useState, useContext } from 'react'
import { FoodContext } from '../context/FoodContext'


const Cart = ({onClose }) => { //prop - function to close the cart
    //hook to access all below values from foodcontext
    const {cart, removeFromCart, updateQuantity, placeOrder} = useContext(FoodContext)
    const [message, setMessage] = useState(''); //state variable message to manage feedback with initial value to empty

    //to calculate the total amount of items in cart
    const totalAmount = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      ).toFixed(2);

    //asyncronous function to handle placing order  
    const handlePlaceOrder = async () => {
        setMessage('');  //Resets the message state to an empty string before processing the order
      
        if (cart.length === 0) {
          setMessage('Your cart is empty.');
          return;
        }
      
        try {
          const success = await placeOrder(cart);  // Send order to the backend
          if (success) {
            setMessage('Order placed successfully!');
          } else {
            setMessage('Failed to place order. Please try again.');
          }
        } catch (error) {
          console.error('Failed to place order:', error);
          setMessage('Failed to place order. Please try again.');  // Display failure message
        }
      };
         


  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in the cart.</p>}
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>${Number(item.price).toFixed(2)}</p>
            <input
              type="number"
              min="1"
              className='cart-input'
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            />
            <div className="cart-item-actions">
              <i className='fa fa-trash' onClick={() => removeFromCart(item.id)}></i>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total Amount: ${totalAmount}</p>
      </div>
      {message && <p className="order-message" style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      <div className="modal-actions">
        <button className="button" onClick={handlePlaceOrder}>Place Order</button>
        <button className="button" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Cart
