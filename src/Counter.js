import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw new Error("Unhanded Action");
  }
}

function Counter() {
  const [number, dipatch] = useReducer(reducer, 0);

  const onInrease = () => {
    dipatch({
      type: "INCREMENT",
    });
  };
  const onDecrease = () => {
    dipatch({
      type: "DECREMENT",
    });
  };

  return (

    <div>
      {number}<br/>
      <button onClick={onInrease}>증가 </button>
      <button onClick={onDecrease}>감소 </button>
    </div>
  );
}

export default Counter;
