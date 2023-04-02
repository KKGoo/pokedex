import { useState, useEffect } from "react";
import { Pokemon } from "../modules/rede";
import PokemonService from "../modules/PokeService";
import PokemonModal from "../components/PokemonModal";
import "../styles/card.scss";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<{
    id: number;
    name: string;
  }>();

  const limit = 10;
  console.log(pokemonList);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { pokemonList, total } = await PokemonService.getAll(page, limit);
      setPokemonList(pokemonList);
      setTotal(total);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleOpenModal = (id: number, name: string) => {
    setSelectedPokemon({ id, name });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="wrapper__pokemon">
        {loading && <p>Loading...</p>}
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <div
              className="card"
              onClick={() => handleOpenModal(pokemon.id, pokemon.name)}
            >
              <div className="pokemonImage__wrap">
                <img
                  className="pokemonImage"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <div className="theme__wrap">
                  {pokemon.types.map((id) => (
                    <p className="theme">{id}</p>
                  ))}
                </div>
              </div>

              <div className="wrapper__pokemonInfo">
                <h1 className="pokemonTittle">
                  {pokemon.name} #{pokemon.id}{" "}
                </h1>
                <p>#{pokemon.abilities.join(" ")}</p>
              </div>
            </div>
          </li>
        ))}
      </div>
      <div className="buttons">
        <button disabled={page === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <h2>
          Page {page} of {Math.ceil(total / limit)}
        </h2>

        <button
          disabled={page === Math.ceil(total / limit)}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      {selectedPokemon && (
        <PokemonModal
          pokemonId={selectedPokemon.id}
          onClose={() =>  setSelectedPokemon(undefined)}
          isOpen={!!selectedPokemon}        />
      )}
    </>
  );
}

export default PokemonList;
