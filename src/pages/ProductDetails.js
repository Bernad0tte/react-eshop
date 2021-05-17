import React,{useContext} from "react";
//useHistory for programatically navigation
import { useParams,useHistory } from 'react-router-dom';
//import {CartContext} from "../context/cart";
import {ProductContext} from "../context/products";
import Loading from "../components/Loading";
import {CartContext} from "../context/cart";



export default function ProductDetails() {

  const { id } = useParams();
  const history = useHistory();
  const {products} = useContext(ProductContext);
  const product = products.find(item=>item.id===parseInt(id));

  const{addToCart}=useContext(CartContext);
  

  if(products.length===0){
    return <Loading/>
  }else{
    //destructuring items we need, from product object.
    const {image,title,price,description} = product;
    
    return(
      <section className="single-product">
          <img src={image} alt={title} className="single-product-image"/>
          <article>
            <h1>{title}</h1>
            <h2>${price}</h2>
            <p>{description}</p>
            <button className="btn btn-primary btn-block" 
              onClick = {()=>{
                //add to cart
                addToCart(product);
                history.push('/cart');
              }}>
            Add to Cart

            </button>
          </article>
      </section>
    )
  }

}
