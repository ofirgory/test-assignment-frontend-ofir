import React from "react";
import { Link } from "react-router-dom";

const PokedexLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-80 h-96 bg-red-600 rounded-lg border-4 border-black relative">
        <div className="absolute top-3 left-3 w-12 h-12 bg-blue-400 rounded-full border-4 border-white shadow-lg"></div>

        <div className="absolute top-4 right-4 flex space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>

        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center">
          <img
            src="/design/International_Pokémon_logo.svg.png"
            alt="Pokémon Logo"
            className="w-32 mx-auto"
          />
          <p className="text-yellow-200 font-bold text-sm">
            Gotta Catch 'Em All!
          </p>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-2xl font-bold tracking-wider">
            Pokédex
          </p>
        </div>

        <div className="absolute bottom-6 right-4">
          <Link to="/pokemon-list">
            <button className="w-8 h-8 bg-blue-400 text-black font-bold rounded-full hover:bg-yellow-500 transition flex justify-center items-center"></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokedexLayout;
