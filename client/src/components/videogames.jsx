import { useEffect, useState } from "react";
import Games from "./Games.jsx";
import { useDispatch, useSelector } from "react-redux";
import { axiosVideogames, getGenre } from "../Store/actions";
import { Pagination } from "./Pagination.js";
import Videogame from "./videogame";
import s from "./styles/videogames.module.css";
import axios from "axios";

export default function Videogames() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const videogames = useSelector((state) => state.filteredVideogames);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  useEffect(() => {
    dispatch(getGenre());
    dispatch(axiosVideogames());
  }, []);

  useEffect(() => {
    const axiosGames = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/videogame");
      setGames(res.data);
      setLoading(false);
    };

    axiosGames();
  }, []);

  console.log(games);

  //get current games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Probando Paginado</h1>
      <Games games={currentGames} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        paginate={paginate}
      />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosVideogames, getGenre } from "../Store/actions";
// import Videogame from "./videogame";
// import s from "./styles/videogames.module.css";

// export default function Videogames() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const videogames = useSelector((state) => state.filteredVideogames);

//   setTimeout(() => {
//     setLoading(false);
//   }, "2000");

//   if (loading) {
//     return <h1 className={s.loading}>Loading videogames...</h1>;
//   }
//   return (
//     <div className={s.container}>
//       {videogames.map((videogame, i) => {
//         return (
//           <div key={i} className={s.videogames}>
//             <Videogame
//               id={videogame.id}
//               name={videogame.name}
//               image={videogame.image}
//               genres={videogame.genres}
//               platforms={videogame.platforms}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
