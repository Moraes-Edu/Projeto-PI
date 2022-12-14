import React, { useState, useEffect } from "react";
import "./style.css";
import Post from "./components/postit";

const App = () => {
  const [post, setPost] = useState(
    JSON.parse(localStorage.getItem("post")) || []
  );
  const [lastPostId, setLastPostId] = useState(-1);
  function ListItem(props) {
    return (
      <Post
        id={props.value.id}
        handleBlur={(id, value, posValue, tamanho) =>
          change(id, value, posValue, tamanho)
        }
        value={props.value.defaultValue}
        pos={props.value.pos}
        size={props.value.size}
      />
    );
  }
  const add = () => {
    setPost((state) => [
      ...state,
      {
        id: state.length,
        defaultValue: "",
        pos: { x: 0, y: 0 },
        size: { width: 200, height: 240 },
      },
    ]);
  };
  const change = (id, value, posValue, tamanho) => {
    setLastPostId(id);
    setPost((state) => {
      let array = [...state];
      array[id] = {
        ...state[id],
        defaultValue: value,
        pos: posValue,
        size: { width: tamanho.width, height: tamanho.height },
      };
      return array;
    });
  };
  const remove = () => {
    if (lastPostId === -1) {
      alert("nenhum postit selecionado");
      return;
    }
    setPost((state) =>
      [...state]
        .filter((x) => x.id !== lastPostId)
        .map((x, y) => {
          return { ...x, id: y };
        })
    );
    setLastPostId(-1);
  };
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(post));
  }, [post]);

  return (
    <div className="Canvas">
      <button onClick={add}>+</button>
      <button onClick={remove}>-</button>
      <ul>
        {post.map((value) => (
          <ListItem key={value.id} value={value} />
        ))}
      </ul>
    </div>
  );
};

export default App;
