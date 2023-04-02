import axios from 'axios';
import { Pokemon } from './rede';

class PokemonService {
  [x: string]: any;
  async getAll(page: number, limit: number): Promise<{ pokemonList: Pokemon[], total: number }> {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
    const pokemonList = await Promise.all(
      data.results.map(async (result: any) => {
        const { data: pokemonData } = await axios.get(result.url);
        const abilities = await Promise.all(
          pokemonData.abilities.map(async (ability: any) => {
            const { data: abilityData } = await axios.get(ability.ability.url);
            return abilityData.name;
          })
        );
        return {
          name: pokemonData.name,
          id: pokemonData.id,
          types: pokemonData.types.map((type: any) => type.type.name),
          image: pokemonData.sprites.front_default,
          abilities,
        };
      })
    );
    return { pokemonList, total: data.count };
  }
}

export default new PokemonService();