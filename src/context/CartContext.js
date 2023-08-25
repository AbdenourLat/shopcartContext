import { createContext, useContext, useReducer } from 'react';
import { cartReducer } from '../reducer/cartReducer';

const initState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(initState);

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, initState);

    const addToCart = (product) => {
        const tmp = state.cartList.concat(product);

        updateTotal(tmp);

        dispatch(
            {type: "ADD_TO_CART",
            payload: {
                product: tmp
            }}
        );

    };

    const removeFromCart = (product) => {
        const tmp = state.cartList.filter(current => current.id !== product.id);

        updateTotal(tmp);

        dispatch(
            {
                type: "REMOVE_FROM_CART",
                payload: {
                    product: tmp
                }
            }
        );
    };

    const updateTotal = (products) => {
        var ttl = 0;
        products.forEach(product => ttl = ttl + product.price);

        dispatch(
            {
                type: "UPDATE_TOTAL",
                payload: {
                    total: ttl
                }
            }
        );
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart
    };


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
} 

export const useCart = () => useContext(CartContext);

