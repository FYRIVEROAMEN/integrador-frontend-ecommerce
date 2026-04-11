import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import ProductDetail from "../pages/ProductDetail";
import AdminProducts from "../pages/AdminProducts";
import AdminUsers from "../pages/AdminUsers";  
import SobreNosotros from "../pages/SobreNosotros";
import Products from "../pages/Products";
import Login from "../pages/Login";
import CarritoDeCompras from "../pages/CarritoDeCompras";


const AdminGuard = ({ children }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    return user?.role === "admin" ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/sobrenosotros" element={<SobreNosotros />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/carrito" element={<CarritoDeCompras />} />

            {/* RUTAS PROTEGIDAS  */}
            {/* Solo entran si son admin. Si no, el AdminGuard los rebota. */}
            <Route path="/admin" element={
                <AdminGuard>
                    <AdminProducts />   
                </AdminGuard>
            } />
            
            <Route path="/admin-users" element={
                <AdminGuard>
                    <AdminUsers />
                </AdminGuard>
            } />

            <Route path="*" element={<h2 style={{ color: 'white' }}>404 - ¡Acá no hay bananas!</h2>} />
        </Routes>
    );
};

export default AppRoutes;