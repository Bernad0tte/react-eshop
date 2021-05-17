// cart context
import React,{useState} from "react";
import localCart from "../utils/localCart";

function getCartFromLocalStorage (){
  return localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  :[];
}

const CartContext = React.createContext();

function CartProvider({children}){
    const[cart,setCart]=useState(getCartFromLocalStorage());
    const[total,setTotal]=useState(0);
    const[cartItems,setCartItems]=useState(0);

    React.useEffect(() => {
        // local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // cart items
        //what does reduce method do? this method, itterates on array(cart) and execute a function(callback) on each array element.
        let newCartItems = cart.reduce((sum, cartItem) => {
          return (sum += cartItem.amount);
        }, 0);
        setCartItems(newCartItems);
        // cart total
        let newTotal = cart.reduce((sum, cartItem) => {
          return (sum += cartItem.amount * cartItem.price);
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
      }, [cart]);
    
    const removeItem = id =>{ setCart([...cart].filter( item => item.id !== id ))};

    const increaseAmount = id =>{
      const newCart = [...cart].map(item=>{
          return item.id === id ? {...item,amount:item.amount+1}:{...item};
        }
      );
      setCart(newCart);
    };

    const decreaseAmount = (id,amount) =>{
      if(amount===1){
        removeItem(id);
        return;
      }
      else{
        const newCart = [...cart].map(item=>{
        return item.id === id ? {...item,amount:item.amount-1}:{...item};
      }
    
    );
    setCart(newCart);
}};

    const addToCart = product =>{
      
      const {id,image,price,title} = product;
     
      const item = cart.find(item => item.id === id);
      if(item){
        increaseAmount(id);
        return;
      }
      else{
        const newItem= {id,price,image,title, amount:1};
        const newCart=[...cart,newItem];
        setCart(newCart);
      }

      
    };

    const clearCart = () =>{
      setCart([]);
    };


    return (
    <CartContext.Provider value={{
        cart,total,cartItems, removeItem,increaseAmount,decreaseAmount,addToCart,clearCart
        }}>
        {children}
    </CartContext.Provider>
    )
}

export {CartContext,CartProvider};