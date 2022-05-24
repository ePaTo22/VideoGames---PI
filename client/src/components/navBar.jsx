import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchbar";
import { useSelector } from "react-redux";
import {
  ASCENDING,
  DESCENDING,
  TOP,
  LOW,
  ALL,
  CREATED,
  EXISTING,
} from "../const/order";
import s from "./styles/Navbar.module.css";

export default function NavBar({
  handleSortName,
  handleSortRating,
  handleFilterGenre,
  handleFilterCreated,
}) {
  const allGenre = useSelector((state) => state.genres);

  return (
    <div className={s.containerAll}>
      <div className={s.containerSearch}>
        <SearchBar />
      </div>

      <div className={s.containerSelects}>
        <h3 className={s.filtros}>Filters</h3>

        <select name="Order ⇵" onChange={handleSortName} className={s.select}>
          <option disabled="disabled" className={s.option}>
            Order ⇵
          </option>
          <option value={ASCENDING}>A-Z</option>
          <option value={DESCENDING}>Z-A</option>
        </select>

        <select
          name="Rating ⇵"
          onChange={handleSortRating}
          className={s.select}
        >
          <option disabled="disabled" className={s.option}>
            Rating ⇵
          </option>
          <option value={TOP}>Rating Top</option>
          <option value={LOW}>Rating Low</option>
        </select>

        <select
          className={s.select}
          onChange={handleFilterGenre}
          defaultValue={"DEFAULT"}
        >
          <option disabled="disabled" value="DEFAULT" className={s.option}>
            Filter by Genre
          </option>
          <option>All</option>
          {allGenre.map((genre) => (
            <>
              <option key={genre.name} value={genre.name} className={s.opt}>
                {genre.name}
              </option>
              <div>
                <p>{genre.name}</p>
              </div>
            </>
          ))}
        </select>

        <select onChange={handleFilterCreated} className={s.select}>
          <option className={s.option}>Games</option>
          <option value={ALL}>All</option>
          <option value={CREATED}>Created</option>
          <option value={EXISTING}>Existing</option>
        </select>

        <div className={s.butDiv}>
          <NavLink to={"/add"}>
            <button src="/home" className={s.buttonCreate}>
              Create Videogame
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

// <label style={{ color: "white" }}>
// Filter by Genres
// <select name="Genre" onChange={handleFilterGenre} multiple={true}>
//   <option>Genres</option>

//   {allGenre.map((genre) => (
//     <option key={genre.name} value={genre.name}>
//       {genre.name}
//     </option>
//   ))}
// </select>
// </label>
