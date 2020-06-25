import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api";

export default (props) => {
  const [img, setImg] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    api.get(`/${props.name}`).then((res) => {
      console.log(res.data);
      setImg(res.data.sprites.front_default);
      setTypes(res.data.types);
      setType(res.data.types[0].type.name);
    });
  }, []);

  function renderImg() {
    return <img src={img} alt={img}></img>;
  }
  return (
    <div className={"poke-card"}>
      <div className="header">
        <div className={type}>{renderImg()}</div>
      </div>
      <div className="body">
        <h2>{props.name}</h2>
        {types.map((item) => (
          <span className={item.type.name}>{item.type.name}</span>
        ))}
      </div>
    </div>
  );
};
