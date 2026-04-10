import { useState } from "react";
import axios from "axios";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Sumatoria total del precio
    const total = orders.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    //Cantidad total de ítems en la orden 
    const countItems = orders.reduce((acc, item) => acc + item.quantity, 0);

    // Agregar producto con control de quantity 
    const addItemToOrder = (product) => {
        const itemExist = orders.find((item) => item._id === product._id);
        if (itemExist) {
            setOrders(orders.map((item) => 
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setOrders([...orders, { ...product, quantity: 1 }]);
        }
    };

    //Función para vaciar el carrito 
    const clearCart = () => {
        setOrders([]);
    };

    const createOrder = async (userId) => {
        try {
            const newOrder = {
                totalPrice: total,
                user: userId,
                products: orders.map(i => ({ 
                    product: i._id, 
                    quantity: i.quantity, 
                    price: i.price 
                }))
            };
            
            // Eorden al back
            await axios.post("http://localhost:3000/api/orders", newOrder);
            
            // REQUERIMIENTO: Inmediatamente después, GET y consola 
            const res = await axios.get("http://localhost:3000/api/orders");
            console.log("--- HISTORIAL DE ÓRDENES (Requerimiento 48) ---");
            console.log(res.data);
            
            clearCart(); 
            
        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ 
            orders, 
            total, 
            countItems, 
            addItemToOrder, 
            createOrder, 
            clearCart 
        }}>
            {children}
        </OrderContext.Provider>
    );
};