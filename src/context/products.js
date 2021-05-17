 // products context
import axios from "axios";
import url from '../utils/URL';
import React,{useState,useEffect } from "react";
import { featuredProducts, flattenProducts } from "../utils/helpers";


//Provider component and useContext() will be reachable after bottom line of code. 
 export const ProductContext = React.createContext();


 
 export default function ProductProvider({children}) {
    const [loading,setLoading]= useState(false);
    const [products,setProducts]= useState([]);
    const [featured,setFeatured]= useState([]);

    useEffect(() => {
        axios.get(`${url}/products`)
        .then(response => {
            const featured = featuredProducts(flattenProducts(response.data));
            const products = flattenProducts(response.data);
            setProducts(products);
            //console.log(response.data[0].image[0].url);
            setFeatured(featured);
            setLoading(false);
        })
        return () => {}
    }, []);


     return (
         <ProductContext.Provider value={{products,loading,featured}}>
             {children}
         </ProductContext.Provider>
     )
 }
 
