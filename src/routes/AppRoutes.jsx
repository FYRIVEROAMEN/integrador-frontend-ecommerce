import {Routes, Route} from "react-router-dom";
import Home from "../pages/home";
import Registro from "../pages/Registro"
import ProductDetail from "../pages/ProductDetail";
import AdminProducts from "../pages/AdminProducts";
import SobreNosotros from "../pages/SobreNosotros";
import Products from "../pages/Products"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/productos/:id" element={<ProductDetail/>}/>
            <Route path="/sobrenosotros" element= {<SobreNosotros/>}/>
            <Route path="/admin" element={<AdminProducts/>}/>
            <Route path="/Products" element={<Products/>}/>

            <Route path="*" element={<h2 style={{color: 'white'}}>404 - ¡Acá no hay bananas!</h2>} />
            


    </Routes> 
    );
};
export default AppRoutes;