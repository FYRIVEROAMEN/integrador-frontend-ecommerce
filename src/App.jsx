import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/footer";
import Hero from "./components/Hero";
import "./App.css";





function App() {
  return (
    <Router>
      <Navbar/> 
      <main>
        <AppRoutes />  {/* acá van a vivir todas las rutas de la app */}
        </main>
        <Footer />
      
    </Router>
  )
}

export default App
