import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext.jsx";
import Swal from "sweetalert2";
import "../styles/carritoDeCompras.css";

const CarritoDeCompras = () => {
    const { order, total, clearCart, createOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    const handleFinalizarCompra = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user) {
            Swal.fire({
                icon: "info",
                title: "Sesión requerida",
                text: "Debes iniciar sesión para finalizar tu pedido.",
                confirmButtonColor: "#3085d6"
            });
            return navigate("/login");
        }

        const success = await createOrder();
        
        if (success) {
            Swal.fire({
                icon: "success",
                title: "Pedido confirmado",
                text: "Tu orden ha sido procesada con éxito. Puedes ver los detalles en la consola.",
                confirmButtonColor: "#28a745"
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo procesar la orden en este momento."
            });
        }
    };

    if (order.length === 0) {
        return (
            <main className="container my-5 text-center text-white">
                <h2>Tu carrito está vacío</h2>
                <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/Products")}>
                    Ir a la tienda
                </button>
            </main>
        );
    }

    return (
        <main className="container my-5 text-white">
            <h2 className="text-center mb-4">Resumen de tu Orden</h2>
            
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Precio Unitario</th>
                            <th className="text-end">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-end">${item.price.toLocaleString('es-AR')}</td>
                                <td className="text-end">${(item.quantity * item.price).toLocaleString('es-AR')}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end fw-bold">Total de la orden:</td>
                            <td className="text-end fw-bold">${total.toLocaleString('es-AR')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-outline-danger" onClick={clearCart}>
                    Vaciar Carrito
                </button>
                <button className="btn btn-primary" onClick={handleFinalizarCompra}>
                    Finalizar Compra
                </button>
            </div>
        </main>
    );
};

export default CarritoDeCompras;