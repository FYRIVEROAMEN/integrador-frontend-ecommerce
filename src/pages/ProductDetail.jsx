import { useEffect, useState, useContext } from "react";    
import { useParams, useNavigate } from "react-router-dom";   
import axios from "axios";
import { OrderContext } from "../context/OrderContext.jsx"; 
import Swal from "sweetalert2";
import "../styles/productDetail.css";

const ProductDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null); 
    
    const [cantidad, setCantidad] = useState(1); 
    
    const { addItemToCart } = useContext(OrderContext);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
                const respuesta = await axios.get(url);
                setProducto(respuesta.data); 
            } catch (error) {
                console.error("Error al obtener el producto", error);
            }
        }
        obtenerProducto();
    }, [id]);

    const handleAdd = () => {
        
        addItemToCart(producto, cantidad); 
        Swal.fire({
            icon: 'success',
            title: 'Producto añadido',
            text: `${producto.name} (${cantidad} unidades) se agregó al carrito.`,
            showConfirmButton: false,
            timer: 1500,
            background: '#1a1a1a',
            color: '#fff'
        });
    };

    const handleBuyNow = () => {
        addItemToCart(producto, cantidad);
        navigate("/carrito");
    };

    if (!producto) return <h2 className="text-white text-center">Cargando información del producto...</h2>;

    return (
        <main className="product-page">
            <section className="product-detail">
                <div className="pd-gallery">
                    <img src={`${import.meta.env.VITE_API_URL}${producto.image}`} alt={producto.name} />
                </div>
                <div className="pd-info">
                    <h1>{producto.name}</h1>
                    <p className="pd-price">${Number(producto.price).toLocaleString('es-AR')}</p>
                    <p className="pd-desc">{producto.description || "Sin descripción disponible."}</p>

                    <div className="pd-quantity">
                        <label htmlFor="cantidad">Cantidad: </label>
                     
                        <input 
                            id="cantidad" 
                            type="number" 
                            min="1" 
                            value={cantidad} 
                            onChange={(e) => setCantidad(e.target.value)} 
                        />
                    </div>

                    <div className="pd-buttons">
                        <button className="btn btn-primary" onClick={handleAdd}>
                            Añadir al carrito
                        </button>
                        <button className="btn btn-success" onClick={handleBuyNow}>
                            Comprar ahora
                        </button>
                        <button className="btn btn-outline" onClick={() => navigate("/carrito")}>
                            Ver carrito
                        </button>
                    </div>

                    <div className="pd-coupon">
                        <h4>Cupón Descuento</h4>
                        <p>Usa el código <strong>BOEDO10</strong> para obtener un 10% de descuento.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductDetail;