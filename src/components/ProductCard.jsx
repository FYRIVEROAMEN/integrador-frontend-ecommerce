import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../context/OrderContext.jsx";
import Swal from "sweetalert2";

const ProductCard = ({ producto }) => {
    const { addItemToCart } = useContext(OrderContext);

    const handleAddToCart = () => {
        addItemToCart(producto);
        Swal.fire({
            icon: 'success',
            title: 'Producto añadido',
            text: `${producto.name} se ha agregado al carrito de compras.`,
            showConfirmButton: false,
            timer: 1500,
            background: '#1a1a1a',
            color: '#fff'
        });
    };

    return (
        <article className="card">
            <img 
                src={`${import.meta.env.VITE_API_URL}${producto.image}`} 
                alt={producto.name} 
            />
            
            <div className="card-body">
                <h3 className="card-title">{producto.name}</h3>
                <span className="card-cat">{producto.category}</span>
                <span className="card-price">
                    $ {Number(producto.price).toLocaleString('es-AR')}
                </span>
                
                <div className="card-actions">
                    <Link className="btn btn-outline" to={`/productos/${producto._id}`}> 
                        Ver más
                    </Link>
                    
                    <button 
                        className="btn btn-primary" 
                        onClick={handleAddToCart}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;