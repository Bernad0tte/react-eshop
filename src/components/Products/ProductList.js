import React from "react";
import Product from "./Product";

export default function ProductList({title,products}) {
  return(
    <section className="section">
        <h2 className="section-title">{title}</h2>
        <div className="products-center">
            { products.map(product=>{
                return <Product key={product.id} {...product}  />
              })

            }
          
        </div>
    </section>
  )
}
