import React, { useEffect, useState } from "react";
import Card from "./components/card/Card";
import "bootstrap/dist/css/bootstrap.css";
import api from "./services/api";
import "./App.css";

function App() {
  const [pokes, setPokes] = useState([]);
  useEffect(() => {
    api.get("/").then((res) => {
      setPokes(res.data.results);
    });
  }, []);

  function renderPokes() {
    return pokes.map((poke) => <Card name={poke.name} key={poke.name} />);
  }

  return <div className="container">{renderPokes()}</div>;
}

export default App;
