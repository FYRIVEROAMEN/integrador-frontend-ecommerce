import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import "../components/nosotros.css"; 

const SobreNosotros = () => {
  return (
    <main className="container-nosotros">
      <section className="about">
        <div className="about-intro">
          <h2>Sobre Nosotros</h2>
          <p>
            Más de una década conectando a las personas con la mejor tecnología. En Celulares Boedo, combinamos experiencia, confianza y atención personalizada en cada venta, ofreciendo además un servicio técnico especializado para garantizar el máximo rendimiento y durabilidad de tus equipos.
          </p>
        </div>

        <figure className="about-hero">
          <div className="hero-media">
            <video
              src="/¡BUEN COMIENZO DE SEMANA! ¿Te imaginas arrancarla así ¡Con el celular que más querías! En celula.mp4" 
              width="400"
              height="480"
              allowFullScreen
              title="Video promocional Boedo"
              controls
              autoPlay
              muted
              loop
            ></video>
          </div>
        </figure>

        <div className="team">
          <div className="member">
            <div className="member-media">
              <img src="/imagenes/yamil-perfil.png" alt="Yamil Amen" />
            </div>
            <div className="member-info">
              <h3 className="member-name">Yamil Amen</h3>
              <p className="member-role">Full Stack Developer</p>
              <p className="member-bio">Un hombre queriendo darle de comer a su familia y apasionado por la tecnología.</p>
              <div className="member-social">
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SobreNosotros;