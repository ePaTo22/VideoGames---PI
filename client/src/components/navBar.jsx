import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ASCENDING,
  DESCENDING,
  TOP,
  LOW,
  ALL,
  CREATED,
  EXISTING,
} from "../const/order";
import {
  orderByName,
  orderByRating,
  filterByGenre,
  filterByCreated,
} from "../Store/actions";
import SearchBar from "./searchbar";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleSortName(e) {
    console.log(e.target.value);
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleSortRating(e) {
    console.log(e.target.value);
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
  }

  function handleFilterGenre(e) {
    console.log(e.target.value);
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
  }

  function handleFilterCreated(e) {
    console.log(e.target.value);
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
  }

  const allGenre = useSelector((state) => state.genres);

  return (
    <div>
      <div>
        <SearchBar />
      </div>

      <select name="Order ⇵" onChange={handleSortName}>
        <option value={ASCENDING}>A-Z</option>
        <option value={DESCENDING}>Z-A</option>
      </select>

      <select name="Rating ⇵" onChange={handleSortRating}>
        <option value={TOP}>Rating Top</option>
        <option value={LOW}>Rating Low</option>
      </select>

      <select name="Genre" onChange={handleFilterGenre}>
        <option>Genres</option>
        <option value="every">Show All</option>

        {allGenre.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>

      <select onChange={handleFilterCreated}>
        <option>Games</option>
        <option value={ALL}>All</option>
        <option value={CREATED}>Created</option>
        <option value={EXISTING}>Existing</option>
      </select>

      <div>
        <NavLink to={"/add"}>
          <button src="/home">Create Videogame</button>
        </NavLink>
      </div>
    </div>
  );
}
