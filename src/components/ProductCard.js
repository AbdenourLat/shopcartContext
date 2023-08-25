import {useEffect, useState} from 'react';
import "./ProductCard.css";
import { useCart } from "../context/CartContext";

export const ProductCard = ({product}) => {
  const {addToCart, cartList, removeFromCart} = useCart();

  const [added, setAdded] = useState(false);

  const {id, name, price, image} = product;
  
  useEffect(() => {
  const isAdded = cartList.find( cart => cart.id === id);
  setAdded(isAdded);
  }, [cartList]);

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {
           !added ? <button onClick={
            () => addToCart(product)
          } >Add To Cart</button> : 
          <button id='red' onClick={ 
            () => removeFromCart(product)
            }>Remove</button>
        }
      </div>
    </div>
  )
}
