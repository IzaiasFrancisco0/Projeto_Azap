import { useState, useEffect } from 'react';
import './Container.css';
import Search from '../Search/Search';
import Modal from '../Modal/Modal';

export default function Container() {
  const [dados, setDados] = useState([]);
  const [pesquisar, setPesquisar] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [heroiVencedor, setHeroiVencedor] = useState(null);
  const [heroisSelecionados, setHeroisSelecionados] = useState([]); 

  useEffect(() => {

    fetch('https://homologacao3.azapfy.com.br/api/ps/metahumans')
      .then(res => res.json())
      .then(data => {
        setDados(data);
      })

      .catch(error => console.error('Erro ao buscar dados:', error));

  }, []);

  const filterHero = dados.filter(heroi =>
    heroi.name.toLowerCase().includes(pesquisar.toLowerCase())
  );

  const calcularPoderTotal = (powerstats) => {
    return Object.values(powerstats).reduce((acc, stat) => acc + stat, 0);
  };

  const selecionarHeroi = (heroi) => {
    setHeroisSelecionados(prevSelecionados => {
      if (prevSelecionados.includes(heroi)) {
        return prevSelecionados.filter(h => h !== heroi); 
      } else {
        return [...prevSelecionados, heroi]; 
      }
    });
  };

  const iniciarBatalha = () => {
    if (heroisSelecionados.length === 2) {
      const [heroi1, heroi2] = heroisSelecionados;

      const poderTotal1 = calcularPoderTotal(heroi1.powerstats);
      const poderTotal2 = calcularPoderTotal(heroi2.powerstats);

      const vencedor = poderTotal1 >= poderTotal2 ? heroi1 : heroi2;

      setHeroiVencedor(vencedor);
      setModalOpen(true);
    } else {
      alert('Selecione exatamente dois heróis para iniciar a batalha.');
    }
  };

  return (
    <div className="container">
      <Search pesquisar={pesquisar} setPesquisar={setPesquisar} />
      <div className="container_cards">
      {filterHero.length > 0 ? (
        filterHero.map((heroi) => (
           
          <div class="card" key={heroi.id} onClick={() => selecionarHeroi(heroi)}>
             
            <h2>{heroi.name}</h2>
            <p>{heroi.description}</p>
            <img src={heroi.images.sm} alt={heroi.name} />
                
            <button class="selecionar">
              {heroisSelecionados.includes(heroi) ? 'Desmarcar' : 'Selecionar'}
            </button>
            
          </div>
       
        ))
      ) : (
        <p>Carregando..</p>
      )}
       </div>
      <button className="batalha" onClick={iniciarBatalha}>Iniciar Batalha</button>
      
      {ModalOpen && <Modal heroiVencedor={heroiVencedor} setIsModalOpen={setModalOpen} />}
    </div>
  );
}
