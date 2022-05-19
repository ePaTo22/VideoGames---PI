import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenre } from "../Store/actions";
import { plataformsArray } from "./platforms";

export default function AddVideogame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({
    name: "Please insert a name",
  });

  function formErrors(err) {
    let errors = {};
    if (!err.name) errors.name = "Please insert a name";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.name)) {
      errors.name = "Please remove the space at the beginning";
    }

    if (!err.description) errors.description = "Please insert a description";

    if (!err.rating) errors.rating = "Please insert a rating";
    else if (err.rating > 5) {
      errors.rating = "Rating must be less than 5";
    }

    if (!err.released) errors.released = "Please insert a released date";
    // else if (!/^(\d{1,2})-(\d{1,2})-(\d{4})$/.test(err.released)) {
    //   errors.released = "Error! Please enter a date in the format dd-mm-yyyy";
    // }

    if (!err.genres) errors.genres = "Please choose at least one genre";

    if (!err.platforms) errors.platforms = "Please choose at least one genre";

    return errors;
  }

  const [input, setInput] = useState({
    platforms: [],
    genres: [],
  });

  function onInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      formErrors({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(errors);
  }

  function onPlatfromChange(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function onGenresChange(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  useEffect(() => {
    dispatch(getGenre());
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/videogame/", input)
      .then(() => {
        alert("Videogame Created!");
      })
      .then(() =>
        setInput({
          platforms: [],
          genres: [],
        })
      )
      .then(() => {
        navigate("/home");
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="">Name: </label>
      <input
        onChange={onInputChange}
        type="text"
        name="name"
        value={input.name || ""}
      />

      {errors.name ? (
        <span style={{ color: "red" }}> {errors.name} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="">Image: </label>
      <input
        onChange={onInputChange}
        type="text"
        name="backround_image"
        value={input.background_image || " "}
      />

      <br />
      <br />
      <label htmlFor="">Description: </label>
      <input
        onChange={onInputChange}
        type="text"
        name="description"
        value={input.description || " "}
      />

      {errors.description ? (
        <span style={{ color: "red" }}> {errors.description} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="">Released: </label>
      <input
        onChange={onInputChange}
        type="text"
        name="released"
        value={input.released || " "}
      />

      {errors.released ? (
        <span style={{ color: "red" }}> {errors.released} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="">Rating: </label>
      <input
        onChange={onInputChange}
        type="text"
        name="rating"
        value={input.rating || " "}
      />

      {errors.rating ? (
        <span style={{ color: "red" }}> {errors.rating} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="">Genres: </label>
      <select name="genres" onChange={(e) => onGenresChange(e)} required={true}>
        <option>Choose the genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id} label={g.name} />
        ))}
      </select>

      <div>
        {input.genres.map((e, i) => (
          <div key={i}>
            <p>{e}</p>
          </div>
        ))}
      </div>

      {errors.genres ? (
        <span style={{ color: "red" }}> {errors.genres} </span>
      ) : null}

      <br />
      <br />

      <label>Plataforms: </label>
      <select name="plataforms" onChange={onPlatfromChange} required={true}>
        <option>Choose the platforms</option>
        {plataformsArray &&
          plataformsArray?.map((e, i) => {
            return <option key={i} value={e} label={e} />;
          })}
      </select>

      <div>
        {input.platforms.map((g, i) => (
          <div key={i}>
            <p>{g}</p>
          </div>
        ))}
      </div>

      {errors.platforms ? (
        <span style={{ color: "red" }}> {errors.platforms} </span>
      ) : null}

      <br />
      <br />
      <input
        type="submit"
        disabled={Object.keys(errors).length ? true : false}
      />
    </form>
  );
}

// name: "",
// description: "",
// background_image: "",
// released: "",
// rating: "",
