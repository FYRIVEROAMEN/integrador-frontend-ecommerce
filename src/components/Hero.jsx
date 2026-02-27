import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-texto">
        <h1>Todo en celulares y accesorios</h1>
        <p>Calidad, garantía y las mejores marcas. Enviamos a todo el país.</p>
        <a className="btn btn-primary" href="#productos">Ver ofertas</a>
      </div>
      <div className="hero-media">
        <img 
          src="https://www.apple.com/la/iphone-17-pro/images/overview/highlights/highlights_design_endframe__flnga0hibmeu_large.jpg" 
          alt="Imagen representativa de celulares" 
        />
      </div>
    </section>
  );
};

export default Hero;