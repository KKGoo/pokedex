export interface Pokemon {
    url: string;
    stats: any;
    moves: any;
    name: string;
    id: number;
    types: string[];
    image: string;
    abilities: string[];
  }
  export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    moves: string[];
    imageUrl: string;
  }
  export interface User {
    id: number;
    username: string;
    password: string;
  }
