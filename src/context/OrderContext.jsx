import { useState } from "react";
import axios from "axios";
// 1. IMPORTANTE: Importamos la caja desde el archivo que acabamos de crear
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Cálculo del total "en el aire" [cite: 190-191]
    const total = orders.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
            await axios.post("http://localhost:3000/api/orders", newOrder);
            
            // [cite: 219] Requerimiento: Mostrar órdenes por consola
            const res = await axios.get("http://localhost:3000/api/orders");
            console.log("Historial de órdenes:", res.data);
            
            setOrders([]); 
        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, total, addItemToOrder, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};