import { ASCENDING, CREATED, TOP, ALL, EXISTING } from "../../const/order";
import {
  AXIOS_VIDEOGAMES,
  SEARCH_VIDEOGAME,
  GET_GENRE,
  FILTER_BY_GENRE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "../actions";

const initialState = {
  videogames: [],
  filteredVideogames: [],
  genres: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AXIOS_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload,
      };
    case SEARCH_VIDEOGAME:
      console.log(action.payload);

      if (action.payload.length === 0) {
        alert("No hay nada :( ");
        return {
          ...state,
        };
      }

      return {
        ...state,
        filteredVideogames: action.payload,
      };

    case GET_GENRE:
      return { ...state, genres: action.payload };

    case ORDER_BY_NAME:
      console.log(action.payload);
      let orderedVideogames = [...state.videogames];

      orderedVideogames = orderedVideogames.sort((a, b) => {
        console.log(a.name);

        if (a.name < b.name) {
          return action.payload === ASCENDING ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === ASCENDING ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredVideogames: orderedVideogames,
      };

    case ORDER_BY_RATING:
      console.log(action.payload);
      let orderedVideogamesRating = [...state.videogames];

      orderedVideogamesRating = orderedVideogamesRating.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === TOP ? 1 : -1;
        }
        if (a.rating > b.rating) {
          return action.payload === TOP ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        filteredVideogames: orderedVideogamesRating,
      };

    case FILTER_BY_GENRE:
      console.log(action.payload);
      let genreVideogames = [...state.videogames];
      console.log(state.videogames);

      if (action.payload) {
        genreVideogames = genreVideogames.filter((e) => {
          return e.genres.includes(action.payload + " ");
        });
      }

      return {
        ...state,
        filteredVideogames: genreVideogames,
      };

    case FILTER_CREATED:
      console.log(action.payload);

      let createdVideogames = [...state.videogames];

      if (action.payload === CREATED) {
        createdVideogames = createdVideogames.filter((e) => {
          return e.created;
        });
      }

      if (action.payload === EXISTING) {
        createdVideogames = createdVideogames.filter((e) => {
          return !e.created;
        });
      }

      return {
        ...state,
        filteredVideogames: createdVideogames,
      };

    default:
      return state;
  }
}
