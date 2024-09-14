import React from 'react'

const OrderPopup = ({ onClose, onPlaceOrder, totalAmount }) => {

    

  return (
    <div className="modal">
      <h2>Order Summary</h2>
      <p>Total Amount: ${totalAmount}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>Cancel</button>
        <button className="button" onClick={onPlaceOrder}>Place Order</button>
      </div>
    </div>
  )
}

export default OrderPopup
