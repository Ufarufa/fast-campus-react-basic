import React, {
  useReducer,
  useCallback,
  useRef,
  useMemo,
  createContext,
} from "react";
import CreateUser from "./CreateUser";
import Hello from "./Hello";
import UserList from "./UserList";
import useInputs from "./useInputs";
import produce from "immer";

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
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });

    /* return {
        users: state.users.concat(action.user),
      }; */
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });

    /*
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
      */
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    /*  return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      }; */
    default:
      throw new Error("Unhandled action");
  }
}

const countActiveUsers = (users) => {
  console.log("countActiveUsers");
  return users.filter((user) => user.active).length;
};

export const UserDipspatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDipspatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users}></UserList>
      <div>{count}</div>
    </UserDipspatch.Provider>
  );
}

export default App;
