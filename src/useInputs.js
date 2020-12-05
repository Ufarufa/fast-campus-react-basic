import { useState, useCallback, useReducer, useRef } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ONCHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET": {
      const newState = { ...action.initialState };
      return newState;
    }
    /*
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
      */
  }
};

function useInputs(initialForm) {
  const initial = useRef(initialForm);

  const [form, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    dispatch({
      type: "ONCHANGE",
      name,
      value,
    });
  }, []);

  const reset = useCallback(
    () =>
      dispatch({
        type: "RESET",
        initialState: initial.current,
      }),
    [initial]
  );

  return [form, onChange, reset];
}

/*
function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

*/

export default useInputs;
