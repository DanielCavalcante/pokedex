import React, { useState } from "react";
import Pokes from "./views/pokes/Pokes";

function App() {
  const [state, setState] = useState([]);
  return <Pokes state={state} setState={setState} />;
}

export default App;
