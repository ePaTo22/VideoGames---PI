import "./App.css";
import React from "react";
import Videogames from "./components/videogames";
import SearchBar from "./components/searchbar";
import LandingPage from "./components/landingPage";
import VideogameDetail from "./components/videogameDetail";
import AddVideogame from "./components/addVideogame";
import NavBar from "./components/navBar";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<VideogameDetail />} />
        <Route path="/add" element={<AddVideogame />} />
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Videogames />
            </>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
