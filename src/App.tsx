import { useState } from "react";
import "./reset.css";
import "./App.css";
import GamePage from "./containers/games/GamePage";

function App() {
  return (
    <div className="mt-14">
      <h1 className="text-primary text-6xl font-Maloney mb-10 text-center uppercase">
        Test tractr
      </h1>
      <GamePage />
    </div>
  );
}

export default App;
