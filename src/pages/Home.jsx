import { useState, useEffect } from "react";   
import axios from "axios";  
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import "../App.css";
import Features from "../components/Features";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
      
        const url = "http://localhost:3000/api/products"; 
        const respuesta = await axios.get(url);
        
        
        setProductos(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener los productos de la DB", error);
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <main>
      <Hero />
      
      <section className="productos" id="productos">
        <h2 className="text-center text-white my-5">Ofertas Especiales</h2>
        
        <div className="grid-productos">
          {cargando ? (
         
            <div className="text-center w-100">
              <p style={{color: '#0b6bcd', fontSize: '1.5rem', fontWeight: 'bold'}}>
                Despertando al servidor, bancame un toque.
              </p>
            </div>
          ) : productos.length > 0 ? (
            productos.map((item) => (
          
              <ProductCard key={item._id} producto={item} />
            ))
          ) : (
            <p style={{color: 'white', textAlign: 'center', width: '100%'}}>
              No hay productos cargados todavía, ¡andá al Admin y metele ritmo!
            </p>
          )}
        </div>
      </section>

      <Features />
    </main>
  );
};

export default Home;