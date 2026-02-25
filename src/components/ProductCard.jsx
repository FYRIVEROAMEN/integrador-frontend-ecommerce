import { Link } from "react-router-dom";

const ProductCard = ( { producto }) => {

    // "producto" es un objeto que trae: nombre , precio,, imagen, id, etc. (todo lo que esta en el array de productos)"
    return (
    <article className="card">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <h3 className="card-title">{producto.nombre}</h3>
        <span className="card-cat">{producto.categoria}</span>
        <span className="card-price">$ {Number(producto.precio).toLocaleString('es-AR')}</span>
        
        <div className="card-actions">
          {/* BOTÓN "VER MÁS" CON RUTA DINÁMICA */}
          <Link className="btn btn-outline" to={`/productos/${producto.id}`}> 
            Ver más
          </Link>
          
          <button className="btn btn-primary">Comprar</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;