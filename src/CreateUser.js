import React, { useRef, useContext, useCallback } from "react";
import { UserDipspatch } from "./App";
import useInputs from "./useInputs";

const initialStateInputs = { username: "", email: "" };

function CreateUser() {
  // console.log('CreateUser');
  const nextId = useRef(4);
  const dispatch = useContext(UserDipspatch);

  const [form, onChange, reset] = useInputs(initialStateInputs);
  const { username, email } = form;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>추가</button>
    </div>
  );
}

export default React.memo(CreateUser);
