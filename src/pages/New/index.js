import React, { useState, useMemo } from 'react';

import camera from '../../assets/camera.svg';

import api from '../../services/api';

import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumnail' : ''}>
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Selecione uma imagem" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Nome da sua empresa"
        valeu={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        valeu={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco se GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor cobrado por dia"
        valeu={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="submit-button">Cadastrar</button>
    </form>
  )
}