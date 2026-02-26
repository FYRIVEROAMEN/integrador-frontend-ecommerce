import { useState} from "react";
import "../components/Registro.css";
import Swal from "sweetalert2";    


const Registro = () => {
    const [formData, setFormData] = useState ({
        fullname :"",
        email: "",
        password: "",
        password2: "",
        birthdate: "",
        province: ""
    });

    const hoy = new Date().toISOString().split("T")[0];


    const handleChange = (e) => {

        const {name, value} = e.target // desestructuramos el name y value del input que se esta modificando, que es destructurar el evento (e) para obtener el name y value del input que se esta modificando, por ejemplo si estoy escribiendo en el input de email, el name va a ser "email" y el value va a ser lo que estoy escribiendo en ese momento en el input de email y el target es el input que se esta modificando (en este caso el input de email o nombre o lo que sea)
        setFormData({
            ...formData, // que es ...formData? es para mantener el resto de los datos del formulario que no se estan modificando, es decir, si estoy escribiendo en el input de email, quiero mantener el valor del input de fullname, password, etc. y solo actualizar el valor del input de email

            [name]: value // actualizamos el campo que se esta modificando (el name del input coincide con el nombre del campo en el formData)
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor, ingresá un correo real.',
        confirmButtonColor: '#0b6bcd'
      });
        return;
     } // Salimos de la función para que no se ejecute el resto del código

        if (formData.birthdate > hoy) {
      Swal.fire({
        icon: 'warning',
        title: '¿Viajero del tiempo?',
        text: 'La fecha de nacimiento no puede ser posterior a hoy.',
        confirmButtonColor: '#0b6bcd'
      });
      return;
    }

        if (formData.password !== formData.password2) {
            Swal.fire({
        icon: 'error',
        title: 'Error de tipeo',
        text: 'Las contraseñas no coinciden. ¡Revisalas!',
        confirmButtonColor: '#0b6bcd'
      });
      return
    }

    Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Formulario enviado correctamente.',
            confirmButtonColor: '#0b6bcd'
        });

        console.log("datos enviados", formData); // aca podriamos enviar el formData a un servidor o hacer lo que necesitemos con los datos del formulario
    }
    return (
    <section className="register">
      <h1>Registro</h1>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
       
        <div className="field">
          <label htmlFor="fullname">Nombre completo *</label>
          <input 
            id="fullname" 
            name="fullname" 
            type="text"
            placeholder="Ej: Juan Pérez"
            value={formData.fullname}
            onChange={handleChange}
            required 
          />
          <small className="help">Entre 2 y 60 caracteres.</small>
        </div>

        
        <div className="field">
          <label htmlFor="email">Correo electrónico *</label>
          <input 
            id="email" 
            name="email" 
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="row">
          
          <div className="field">
            <label htmlFor="password">Contraseña *</label>
            <input 
              id="password" 
              name="password" 
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          
          <div className="field">
            <label htmlFor="password2">Repetir contraseña *</label>
            <input 
              id="password2" 
              name="password2" 
              type="password"
              value={formData.password2}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="row">
          
          <div className="field">
            <label htmlFor="birthdate">Fecha de nacimiento *</label>
            <input 
              id="birthdate" 
              name="birthdate" 
              type="date"
              max={hoy}
              value={formData.birthdate}
              onChange={handleChange}
              required 
            />
          </div>

          
          <div className="locacion">
            <label htmlFor="province">Provincia / País *</label>
            <select 
              id="province" 
              name="province" 
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccioná una opción…</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="CABA">CABA</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Tucumán">Tucumán</option>
              <option value="Entre Ríos">Entre Ríos</option>
              <option value="Salta">Salta</option>
              <option value="Misiones">Misiones</option>
              <option value="Chaco">Chaco</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Formosa">Formosa</option>
              <option value="Jujuy">Jujuy</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Crear cuenta</button>
      </form>
    </section>
  )
};






export default Registro;