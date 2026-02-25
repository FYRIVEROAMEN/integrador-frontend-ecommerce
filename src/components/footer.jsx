import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="pie-pagina" id="footer">
            <div className="grupo-1">
                <div className="box">
                    <div className="img">
                        <a href="#">
                            <img src="public/ChatGPT Image 25 sept 2025, 04_07_34 p.m..png" alt="logo de empresa" />
                        </a>
                    </div>
                </div>
                <div className="box">
                    <h2>SOBRE NOSOTROS</h2>
                    <p>Mas de 10 años de trayectoria nos respaldan en venta y reparacion de Celulares</p>
                    <p>Avocados a la venta mayorista de Tecnologia y Gadgets</p>
                </div>
                <div className="box">
                    <h2>SÍGUENOS</h2>
                    <div className="red-social">
                        <a href="https://www.facebook.com/CelularesBoedo" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://www.instagram.com/celularesboedo/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://api.whatsapp.com/send?phone=5491137921850" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;