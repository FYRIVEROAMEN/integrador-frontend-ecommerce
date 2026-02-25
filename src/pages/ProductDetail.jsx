import {  useEffect, useState } from "react";    
import {  useParams } from "react-router-dom";   
import axios from "axios";
import "../components/ProductDetail.css"

const ProductDetail = () => {

const {id} = useParams();  // con esto puedo acceder al id que esta en la url (en este caso el id del producto)

const [producto, setProducto] = useState(null);  // estado para guardar el producto que vamos a mostrar

useEffect (()=> {
    
    const obtenerProducto = async () => {
        try {
            const url = `https://6945e411ed253f51719c869d.mockapi.io/productos/${id}`;  // aca le paso el id a la url para obtener el producto especifico
            const respuesta = await axios.get(url);
            setProducto(respuesta.data);  // guardo el producto en el estado
        } catch (error) {
            console.error("Error al obtener el producto", error);
        }
    }
    obtenerProducto();
}, [id])  // el useEffect se va a ejecutar cada vez que el id cambie (es decir, cada vez que entremos a un producto diferente, si el id cambia el efecto se vuelve a disparar y obtiene el nuevo producto)

if (!producto) { 
 // mientras el producto no se haya cargado, mostramos un mensaje de carga
 return <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Buscando el celular... 🔍</h2>;
}

return (
        <main className="product-page">
            <section className="product-detail">
                {/* Galería de imagen */}
                <div className="pd-gallery">
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>

                {/* Info del producto */}
                <div className="pd-info">
                    <h1>{producto.nombre}</h1>
                    <p className="pd-price">${producto.precio}</p>
                    <p className="pd-desc">{producto.descripcion_corta || "Cargando descripción..."}</p>

                    <div className="pd-quantity">
                        <label htmlFor="cantidad">Cantidad: </label>
                        <input id="cantidad" type="number" min="1" defaultValue="1" />
                    </div>

                    <div className="pd-buttons">
                        <button className="btn btn-primary">Añadir al carrito</button>
                        <button className="btn btn-outline">Comprar ahora</button>
                    </div>

                    <div className="pd-coupon">
                        <h4>Cupón Descuento</h4>
                        <p>Usá <strong>BOEDO10</strong> y obtené 10% OFF pagando en efectivo o transferencia.</p>
                    </div>
                </div>
            </section>

            {/* Sección de Descripción extendida */}
            <section className="pd-description">
                <h2>Descripción</h2>
                <p>{producto.descripcion}</p>
            </section>
        </main>
    );
}

export default ProductDetail;