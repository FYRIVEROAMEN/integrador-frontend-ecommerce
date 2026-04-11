import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/adminProducts.css"

const AdminProducts = () => {
    const [productos, setProductos] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    // ESTADOS PARA CATEGORÍAS
    const [listaCategorias, setListaCategorias] = useState(["Smartphones", "Accesorios", "Gatos", "Iphones"]);
    const [nuevaCat, setNuevaCat] = useState("");

    const [formData, setFormData] = useState({
        name: "", 
        price: "", 
        description: "", 
        category: "", 
        imagen: null, 
    });

    const urlApi = "http://localhost:3000/api/products";



    const getAuthHeaders = () => {
    // Buscamos la llave directamente en su cajón llore como un nene con esto aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    const token = localStorage.getItem("token"); 
    return { 
        headers: { 
            "authorization": token // Mandamos la llave pura al Back
        } 
    };
};

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(urlApi);
            setProductos(res.data);
        } catch (error) { 
            console.error("Error al obtener productos", error); 
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagen") {
            setFormData({ ...formData, imagen: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const agregarCategoria = () => {
        if (nuevaCat.trim() !== "" && !listaCategorias.includes(nuevaCat)) {
            setListaCategorias([...listaCategorias, nuevaCat]);
            setFormData({ ...formData, category: nuevaCat });
            setNuevaCat("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("stock", 10); 
        
        if (formData.imagen) {
            data.append("image", formData.imagen); 
        }

        try {
            if (editando) {
                await axios.put(`${urlApi}/${idEditar}`, data, getAuthHeaders());
                Swal.fire({ icon: "success", title: "¡Producto Actualizado!", background: '#1a1a1a', color: '#fff' });
            } else {
                await axios.post(urlApi, data, getAuthHeaders());
                Swal.fire({ icon: "success", title: "¡Producto Creado!", background: '#1a1a1a', color: '#fff' });
            }
            setEditando(false);
            setIdEditar(null);
            setFormData({ name: "", price: "", description: "", category: "", imagen: null });
            obtenerProductos();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Fallo en la conexión con el servidor', background: '#1a1a1a', color: '#fff', error });
        }
    };

    const eliminarProducto = async (id) => {
        const result = await Swal.fire({ 
            title: '¿Estás seguro?', 
            text: "No podrás revertir esto",
            icon: 'warning', 
            showCancelButton: true, 
            confirmButtonColor: '#d33',
            background: '#1a1a1a', 
            color: '#fff' 
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${urlApi}/${id}`, getAuthHeaders());
                obtenerProductos();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'No tenés permiso', error });
            }
        }
    };

    const prepararEdicion = (p) => {
        setEditando(true);
        setIdEditar(p._id);
        setFormData({
            name: p.name,
            price: p.price,
            description: p.description,
            category: p.category || "", 
            imagen: null
        });
    }

    useEffect(() => { obtenerProductos(); }, []);

    return (
        <main className="admin-page">
            <h1 style={{textAlign: 'center', color: '#fff', marginBottom: '20px'}}>Panel de Control 👤🚀</h1>
            <div className="admin-layout">
                <section className="form-container">
                    <h2 style={{color: '#0b6bcd'}}>{editando ? "Editar Producto" : "Nuevo Producto"}</h2>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Nombre</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="field">
                            <label>Precio</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="field">
                            <label>Categoría</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Seleccioná una...</option>
                                {listaCategorias.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        
                        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                            <input type="text" placeholder="Nueva cat..." value={nuevaCat} onChange={(e) => setNuevaCat(e.target.value)}
                                style={{flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff'}}
                            />
                            <button type="button" onClick={agregarCategoria} style={{padding: '0 20px', borderRadius: '4px', border: 'none', background: '#28a745', color: '#fff', fontWeight: 'bold', cursor: 'pointer'}}>+</button>
                        </div>

                        <div className="field">
                            <label>Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                        </div>
                        <div className="field">
                            <label>Imagen {editando && "(Opcional)"}</label>
                            <input type="file" name="imagen" onChange={handleChange} required={!editando} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '15px'}}>
                            {editando ? "GUARDAR CAMBIOS" : "CARGAR PRODUCTO"}
                        </button>
                        {editando && <button type="button" onClick={() => {setEditando(false); setFormData({name:"",price:"",description:"",category:"",imagen:null})}} style={{width: '100%', marginTop: '10px', background: 'transparent', color: '#fff', border: '1px solid #fff', cursor: 'pointer', padding: '10px'}}>Cancelar</button>}
                    </form>
                </section>

                <section className="products-table">
                    <div className="table-wrap">
                        <table className="cb-table">
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p) => (
                                    <tr key={p._id}>
                                        <td><img src={`http://localhost:3000${p.image}`} alt={p.name} style={{width: '50px', borderRadius: '4px'}} /></td>
                                        <td>{p.name}</td>
                                        <td style={{color: '#0b6bcd', fontWeight: 'bold'}}>{p.category}</td>
                                        <td>${p.price}</td>
                                        <td style={{fontSize: '11px', color: '#888'}}>{p.description}</td>
                                        <td className="td-actions">
                                            <button className="btn-mini btn-edit" onClick={() => prepararEdicion(p)}>Editar</button>
                                            <button className="btn-mini btn-danger" onClick={() => eliminarProducto(p._id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default AdminProducts;