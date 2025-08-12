import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminInfoPage = () => {
  const [info, setInfo] = useState({
    mision: '',
    vision: '',
    valores: '',
    quienes_somos: ''
  });

  // Cargar info desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:2200/apicontenido') // puerto según tu backend
      .then(res => {
        // Convertimos el array [{tipo, contenido}, ...] a un objeto clave-valor
        const datos = {};
        res.data.forEach(item => {
          datos[item.tipo] = item.contenido;
        });
        setInfo(datos);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar cambios por cada campo
    const promesas = Object.keys(info).map(tipo =>
      axios.put(`http://localhost:2200/apicontenido/${tipo}`, {
        contenido: info[tipo]
      })
    );

    Promise.all(promesas)
      .then(() => alert('Información actualizada correctamente'))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Editar Información Institucional</h2>
      <form onSubmit={handleSubmit}>
        <label>Misión:</label>
        <textarea name="mision" value={info.mision || ''} onChange={handleChange} rows="3" />

        <label>Visión:</label>
        <textarea name="vision" value={info.vision || ''} onChange={handleChange} rows="3" />

        <label>Valores:</label>
        <textarea name="valores" value={info.valores || ''} onChange={handleChange} rows="3" />

        <label>Quiénes Somos:</label>
        <textarea name="quienes_somos" value={info.quienes_somos || ''} onChange={handleChange} rows="3" />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default AdminInfoPage;
