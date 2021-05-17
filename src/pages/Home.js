import React,{useContext} from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import {Link} from "react-router-dom";

export default function Home() {
  

  return (
    
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          our products
        </Link>
      </Hero>
      <FeaturedProducts />
    </>
  )
}
