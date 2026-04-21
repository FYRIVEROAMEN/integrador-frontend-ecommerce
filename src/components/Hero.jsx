import { useState, useEffect } from "react";
import "../styles/hero.css";

const Hero = () => {
  const slides = [
    {
      img: "https://www.apple.com/la/iphone-17-pro/images/overview/highlights/highlights_design_endframe__eu8gj0kqlmoi_large.jpg",
      title: "Lo último en iPhone",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvouPI5SxLVtjPbNtQMLXEZtMI_0NO5DnZg&s",
      title: "Accesorios Premium",
    },
    {
      img: "https://images.samsung.com/es/smartphones/galaxy-s26-ultra/images/galaxy-s26-ultra-features-colors-ambient-island-mo.jpg?imbypass=true",
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