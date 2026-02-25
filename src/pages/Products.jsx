import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../components/products.css"
import { data } from "react-router-dom";
import Features from "../components/Features";

const Products = () => {
    const [productos, setProductos ] = useState ([]);


    useEffect (()=>{
        const obtenerProductos = async () => {
            try {
                const url = "https://6945e411ed253f51719c869d.mockapi.io/productos";
                const respuesta = await axios.get(url);
                console.log ("DATA DE LA API", respuesta,data)
                setProductos(respuesta.data);
            } catch (error) {
                console.error("error al obtener productos", error)
            }
        };
            obtenerProductos()
    },[]);

    return (
        <main className="container-productos">
      <h2 className="text-center text-white my-4">Nuestro Catálogo</h2>
      <div className="grid-productos">
        {productos.map((item) => (
          <ProductCard key={item.id} producto={item} />
        ))}
      </div>

      <Features></Features>
    </main>
    

    )


}

export default Products