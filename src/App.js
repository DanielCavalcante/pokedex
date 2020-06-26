import React, { useEffect, useState, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import api from "./services/api";
import "./App.css";
const Card = React.lazy(() => import("./components/card/Card"));

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

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="container">{renderPokes()}</div>
    </Suspense>
  );
}

export default App;
