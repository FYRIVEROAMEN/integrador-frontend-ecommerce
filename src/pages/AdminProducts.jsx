import { useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../components/adminProducts.css"

const AdminProducts = () => {

    const [productos, setProductos] = useState([]);

    const [formData, setFormData] = useState ({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        fecha: new Date().toLocaleDateString('es-ES')
    });

    const urlApi = "https://6945e411ed253f51719c869d.mockapi.io/productos";


    

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(urlApi);
            setProductos(res.data);
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData ({ ...formData, [name]: value })
    }; 

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (editando) {
            // --- MODO EDICIÓN (PUT) ---
            await axios.put(`${urlApi}/${idEditar}`, formData);
            Swal.fire({
                icon: "success",
                title: "Producto actualizado",
                text: "Los cambios se guardaron correctamente, mi rey.",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#0b6bcd',
            });
        } else {
            // --- MODO CREACIÓN (POST) ---
            await axios.post(urlApi, formData);
            Swal.fire({
                icon: "success",
                title: "Producto agregado",
                text: "El nuevo equipo ya está en la lista.",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#0b6bcd',
            });
        }

        setEditando(false);
        setIdEditar(null);
        setFormData({ 
            nombre: "", 
            precio: "", 
            descripcion: "", 
            imagen: "", 
            fecha: new Date().toLocaleDateString('es-ES') 
        });
        
      
        obtenerProductos();

    } catch (error) {
        console.error("Error en la operación:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo procesar la solicitud.',
            background: '#1a1a1a',
            color: '#fff'
        });
    }
};


    const eliminarProducto = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrarlo'
        });
    if (result.isConfirmed) {
        await axios.delete(`${urlApi}/${id}`);
        obtenerProductos();
    }
    };

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const prepararEdicion = (producto) => {
        setEditando(true);
        setIdEditar(producto.id);
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            imagen: producto.imagen,
            fecha: producto.fecha
        });
    }


    useEffect (() => {
        obtenerProductos();
    }, []);


return (
<main className="admin-page">
    <h1>Administrador de productos</h1>

    <div className="admin-layout">
        {/* COLUMNA IZQUIERDA: EL FORMULARIO */}
        <section className="form-container">
            <h2>Agregar Producto</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="nombre">Nombre producto</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="field">
                    <label htmlFor="precio">Precio</label>
                    <input 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        value={formData.precio} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="field">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea 
                        id="descripcion" 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        required 
                    ></textarea>
                </div>

                <div className="field">
                    <label htmlFor="imagen">URL de Imagen</label>
                    <input 
                        type="text" 
                        id="imagen" 
                        name="imagen" 
                        placeholder="https://ejemplo.com/foto.jpg"
                        value={formData.imagen} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary">Cargar</button>
            </form>
        </section>

       
        <section className="products-table">
            <div className="table-wrap">
                <table className="cb-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Descripcion...</th>
                            <th>Producto</th>
                            <th>Fecha</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
    {productos.map((prod) => (
    <tr key={prod.id}>
        <td><img src={prod.imagen} alt={prod.nombre} style={{ width: '50px' }} /></td>|
        <td>{prod.nombre}</td>
        <td>{prod.fecha || "Sin fecha"}</td> 
        <td className="precio-destacado">${prod.precio}</td>
        <td className="td-actions">
            <button className="btn-mini btn-edit" onClick={() => prepararEdicion(prod)}>
                 Editar
            </button>
            <button className="btn-mini btn-danger" onClick={() => eliminarProducto(prod.id)}>
                 Borrar
            </button>
        </td>
    </tr>
))}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</main>
)
}
export default AdminProducts;