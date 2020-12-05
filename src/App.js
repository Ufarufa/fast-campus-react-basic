import React, { useReducer, useCallback, useRef, useMemo } from "react";
import CreateUser from "./CreateUser";
import Hello from "./Hello";
import UserList from "./UserList";
import useInputs from "./useInputs";

const initialState = {
  users: [
    {
      id: 1,
      username: "tester",
      email: "tester.com",
      active: true,
    },
    {
      id: 2,
      username: "lee",
      email: "lee.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      throw new Error("Unhandled action");
  }
}

const countActiveUsers = (users) => {
  console.log("countActiveUsers");
  return users.filter((user) => user.active).length;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [from, onChange, reset] = useInputs({ username: "", email: "" });
  const { users } = state;
  const { username, email } = from;
  const nextId = useRef(4);

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

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
      ></UserList>
      <div>{count}</div>
    </>
  );
}

export default App;
