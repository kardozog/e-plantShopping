import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, decreaseQuantity,increaseQuantity  } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    const total = cart.reduce((acc, item) => {
      const cost = parseFloat(item.cost.substring(1)); // Convert cost from string to number
      return acc + (cost * item.quantity);
    }, 0);
    setTotalAmount(total);
  };
  
  useEffect(() => {
    calculateTotalAmount();
  }, [cart]);

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };
  const handleIncrement = (item) => {
  dispatch(increaseQuantity({ name: item.name }));
  };
  const handleDecrement = (item) => {
    dispatch(decreaseQuantity({name: item.name}));
    };
  

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
               Total: ${parseFloat(item.cost.substring(1)) * item.quantity.toFixed(2)}
               </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
