import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";
import { data } from "react-router-dom";
import Features from "../components/Features";

const Products = () => {
    const [productos, setProductos ] = useState ([]);

    const [filtro, setFiltro] = useState("Todas");


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

    const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];

    const productosFiltrados = filtro === "Todas" 
        ? productos 
        : productos.filter(p => p.categoria === filtro);



    return (
        <main className="container-productos">
            <h2 className="text-center text-white my-4">Nuestro Catálogo</h2>

            {/* 🍌 BOTONES DE CATEGORÍAS */}
            <div className="filter-container">
                {categorias.map(cat => (
                    <button 
                        key={cat} 
                        className={`btn-filter ${filtro === cat ? 'active' : ''}`}
                        onClick={() => setFiltro(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid-productos">
                {productosFiltrados.map((item) => (
                    <ProductCard key={item.id} producto={item} />
                ))}
            </div>

            <Features />
        </main>
    );


}

export default Products