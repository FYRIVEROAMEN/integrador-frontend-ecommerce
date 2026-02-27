import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Cambiamos faShieldCheck por faShieldHalved que es el que suele venir gratis
import { faTruck, faShieldHalved, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import "../styles/features.css";
const Features = () => {
  return (
    <section className="caracteristicas">
      <article className="feat">
        <FontAwesomeIcon icon={faTruck} style={{fontSize: "2rem", color: "#7cc0ff"}} />
        <h3>Envíos a todo el país</h3>
        <p>Recibí tu compra sin moverte de casa.</p>
      </article>

      <article className="feat">
        <FontAwesomeIcon icon={faShieldHalved} style={{fontSize: "2rem", color: "#7cc0ff"}} />
        <h3>Garantía oficial</h3>
        <p>Todos los productos con garantía escrita.</p>
      </article>

      <article className="feat">
        <FontAwesomeIcon icon={faCreditCard} style={{fontSize: "2rem", color: "#7cc0ff"}} />
        <h3>12 cuotas</h3>
        <p>Financiación con tarjetas bancarias.</p>
      </article>
    </section>
  );
};

export default Features;