import React from 'react';
import './Modal.css';

export default function Modal({ heroiVencedor, setModalOpen }) {
  if (!heroiVencedor) return null; 

  const handleClose = () => {
    setModalOpen(false); 
  };

  return (
    <div className="modal_overlay">
      <div className="modal_conteudo">
        <button className="close_button" onClick={handleClose}>
          &times;
        </button>
        <h2>Herói Vencedor</h2>
        <div>
          <h3>{heroiVencedor.name}</h3>
          <p>{heroiVencedor.description}</p>
          <img src={heroiVencedor.images.sm} alt={heroiVencedor.name} />
          <div>
            <h4>Poderes:</h4>
            <ul>
              {Object.entries(heroiVencedor.powerstats).map(([stat, value]) => (
                <li key={stat}>
                  {stat}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
