/* eslint-disable */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(() => {
        const savedOrder = localStorage.getItem("order");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    const [total, setTotal] = useState(0);
    const [countItems, setCountItems] = useState(0);

    useEffect(() => {
        let tempTotal = 0;
        let tempCount = 0;
        order.forEach(item => {
            tempTotal += item.quantity * item.price;
            tempCount += item.quantity;
        });
        setTotal(tempTotal);
        setCountItems(tempCount);
        localStorage.setItem("order", JSON.stringify(order));
    }, [order]);

    // Actualizado: Ahora acepta un segundo parámetro "quantityToAdd"
    const addItemToCart = (product, quantityToAdd = 1) => {
        const itemExists = order.find(item => item._id === product._id);
        const qty = Number(quantityToAdd);

        if (itemExists) {
            // Si el producto ya existía, incrementamos la cantidad elegida [cite: 17]
            setOrder(order.map(item => 
                item._id === product._id ? { ...item, quantity: item.quantity + qty } : item
            ));
        } else {
            // Si el producto no existe, se agrega con la cantidad elegida [cite: 16, 17]
            setOrder([...order, { ...product, quantity: qty }]);
        }
    };

    const clearCart = () => {
        setOrder([]);
        localStorage.removeItem("order");
    };

    const createOrder = async () => {
    // 1. Buscamos las cosas en sus cajones correctos
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    // 2. Si no hay token o no hay usuario, mandamos al login
    if (!token || !userData) {
        Swal.fire("Error de sesión", "Iniciá sesión de nuevo, mi rey.", "error");
        return false;
    }

    // 3. Armamos la orden (usamos userData.id que ya lo tenemos guardado)
    const orderData = {
        totalPrice: total,
        user: userData.id || userData._id, // Usamos el ID directamente
        products: order.map(item => ({ 
            product: item._id, 
            quantity: item.quantity,
            price: item.price
        })),
        status: 'pending'
    };

    try {
        const urlApi = `${import.meta.env.VITE_API_URL}/api/orders`; // Chequeá que el path sea /api/orders
        
        // 4. Mandamos el TOKEN real que sacamos del localStorage
        const config = { 
            headers: { 
                "authorization": token 
            } 
        };

        // Creamos la orden
        await axios.post(urlApi, orderData, config);
        
        // Opcional: Pedir las órdenes después (Requerimiento EIT)
        const response = await axios.get(urlApi, config);
        console.log("REQUERIMIENTO EIT - TODAS LAS ÓRDENES:", response.data);
        
        clearCart();
        return true;

    } catch (error) {
        console.error("Error del Backend:", error.response?.data || error.message);
        return false;
    }
};

    return (
        <OrderContext.Provider value={{ order, total, countItems, addItemToCart, clearCart, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};