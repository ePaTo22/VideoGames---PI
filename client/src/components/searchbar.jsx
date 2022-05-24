import { useState } from "react";
import { searchVideogames } from "../Store/actions";
import { useDispatch } from "react-redux";
import s from "./styles/search.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    if (search.length === 0) {
      alert("Please insert a value");
    }
    e.preventDefault();
    dispatch(searchVideogames(search));
    setSearch("");
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <div className={s.container}>
        <input
          type="text"
          onChange={onInputChange}
          value={search}
          placeholder=" Search Videogame... "
          className={s.input}
        />

        <button type="submit" className={s.button}>
          Search
        </button>
      </div>
    </form>
  );
}
