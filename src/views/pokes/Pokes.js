import React, { useEffect, useState, Suspense } from "react";
import "./styles.css";
import api from "../../services/api";
const Card = React.lazy(() => import("../../components/card/Card"));

function Pokes(props) {
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [pokes, setPokes] = useState([]);

  useEffect(() => {
    findPokes(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById("list");
    if (props.scrollable) {
      list.addEventListener("scroll", (e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      window.addEventListener("scroll", () => {
        if (
          window.scrollY + window.innerHeight ===
          list.clientHeight + list.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById("list");
    if (list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);

  function findPokes(load) {
    if (load) {
      api.get(`?limit=${18}&offset=${offset}`).then((res) => {
        setPokes([...pokes, ...res.data.results]);
        configurePagination();
      });
    }
  }

  function configurePagination() {
    setOffset(offset + 18);
    props.setState([...props.state]);
  }

  function renderPokes() {
    return pokes.map((poke) => <Card name={poke.name} key={poke.name} />);
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="image-container">
        <img src={require("../../assets/poke_logo.svg")} />
      </div>
      <div className="container" id="list">
        {renderPokes()}
      </div>
    </Suspense>
  );
}

export default Pokes;
