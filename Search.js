import './Search.css';

export default function Search({ pesquisar, setPesquisar }) {
  const handleSearch = event => {
    setPesquisar(event.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Digite o nome do Herói"
        value={pesquisar}
        onChange={handleSearch}
      />
    </div>
  );
}
