import React, { useState, useRef, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";
import Hello from "./Hello";
import UserList from "./UserList";

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
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

const countActiveUsers = (users) => {
  console.log("countActiveUsers");
  return users.filter((user) => user.active).length;
};

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(5);

  const { username, email } = inputs;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const onCreate = useCallback(
    (e) => {
      setInputs({
        username: "",
        email: "",
      });

      const user = {
        id: nextId.current,
        username,
        email,
      };

      setUsers((users) => [...users, user]);

      nextId.current += 1;
    },
    [username, email]
  );

  const onRemove = useCallback((id) => {
    setUsers((users) =>
      users.filter((user) => {
        return user.id !== id;
      })
    );
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) => {
      return users.map((user) => {
        return {
          ...user,
          active: user.id === id ? !user.active : user.active,
        };
      });
    });
  }, []);

  const usersActiveCount = useMemo(() => countActiveUsers(users), [users]);

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
        onRemove={onRemove}
        onToggle={onToggle}
      ></UserList>
      <div>{usersActiveCount}</div>
    </>
  );
}

export default App;
