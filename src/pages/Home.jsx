import { useState, useEffect } from "react";   
import axios from "axios";  
import ProductCard from "../components/ProductCard";
import Hero from "../components/hero";
import "../App.css";
import Features from "../components/Features";

const Home = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
  const obtenerProductos = async () => {
    try {
      
      const url = "https://6945e411ed253f51719c869d.mockapi.io/productos"; 
      const respuesta = await axios.get(url);
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  };
    obtenerProductos();
},[])

 
return (
    <main>
        <Hero></Hero>
    <section className="productos" id="productos">
      <h2>Nuestros Productos</h2>
      <div className="grid-productos">
        {productos.length > 0 ? (
          productos.map((item) => (
            <ProductCard key={item.id} producto={item} />
          ))
        ) : (
          <p style={{color: 'white'}}>Cargando, bancame un toque...</p>
        )}
      </div>
    </section>
    <Features/>
    </main>
  );
};






export default Home;