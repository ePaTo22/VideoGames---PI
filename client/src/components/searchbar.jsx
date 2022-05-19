import { useState } from "react";
import { searchVideogames } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./styles/search.module.css";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  let dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchVideogames(search));
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className={s.search}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onInputChange}
          value={search}
          placeholder={"Type a videogame Name..."}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
