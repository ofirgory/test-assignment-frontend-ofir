import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./component/PokemonList";
import PokemonDetails from "./component/PokemonDetails";
import PokedexLayout from "./component/PokedexLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexLayout />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
