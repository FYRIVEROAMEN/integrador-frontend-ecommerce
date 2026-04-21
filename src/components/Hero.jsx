import { useState, useEffect } from "react";
import "../styles/hero.css";

const Hero = () => {
  const slides = [
    {
      img: "https://www.itsitio.com/wp-content/uploads/2025/09/iphone-17-pro-principal.webp",
      title: "Lo último en iPhone",
    },
    {
      img: "https://thumbs.dreamstime.com/b/apple-airpods-pro-con-fondo-negro-kuala-lumpur-malasia-diciembre-de-aislado-contra-el-nuevo-profesional-cuenta-cancelaci%C3%B3n-activa-168198337.jpg",
      title: "Accesorios Premium",
    },
    {
      img: "https://images.samsung.com/ar/smartphones/galaxy-s26-ultra/images/galaxy-s26-ultra-features-colors-durability-a-mo.jpg?imbypass=true",
      title: "Tecnología en tus manos",
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
  
    const startSlider = () => {
      
      if (window.innerWidth > 768) {
        return setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
      }
      return null;
    };

    let intervalo = startSlider();

    
    const handleResize = () => {
      clearInterval(intervalo);
      if (window.innerWidth <= 768) {
        setIndex(0); 
      } else {
        intervalo = startSlider();
      }
    };

    window.addEventListener("resize", handleResize);

    
    return () => {
      clearInterval(intervalo);
      window.removeEventListener("resize", handleResize);
    };
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero-texto">
        
        <h1 key={window.innerWidth <= 768 ? 'static' : index}>
          {slides[index].title}
        </h1>
        <p>Calidad, garantía y las mejores marcas. Enviamos a todo el país.</p>
        <a className="btn btn-primary" href="#productos">Ver ofertas</a>
      </div>
      
      <div className="hero-media">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.img}
            alt={slide.title}
            className={index === i ? "slide active" : "slide"}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;