import React from "react";

export const Games = ({ games, loading }) => {
  if (loading) {
    return <h1>Loading..</h1>;
  }
  return (
    <ul>
      {games.map((game, i) => (
        <li key={i}>{game.name}</li>
      ))}
    </ul>
  );
};

export default Games;
