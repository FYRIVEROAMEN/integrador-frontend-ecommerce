import { createContext, useState } from "react";
import axios from "axios";


export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // [cite: 190-191] CALCULO "EN EL AIRE" (Derivado)
    // No usamos useEffect ni setTotal. Calculamos el total directamente.
    // Es más rápido, más limpio y ELIMINA EL ERROR ROJO.
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
            
            // Requerimiento: GET de todas y mostrar por consola [cite: 219]
            const res = await axios.get("http://localhost:3000/api/orders");
            console.log("Órdenes actualizadas:", res.data);
            
            setOrders([]); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, total, addItemToOrder, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};