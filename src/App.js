import React, { useState, useRef } from "react";
import CreateUser from "./CreateUser";
import Hello from "./Hello";
import UserList from "./UserList";

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
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onCreate = (e) => {
    setInputs({
      username: "",
      email: "",
    });

    const user = {
      id: nextId.current,
      username,
      email,
    };

    setUsers([...users, user]);

    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(
      users.filter((user) => {
        return user.id !== id;
      })
    );
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) user.active = !user.active;

        return user;
      })
    );
  };

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
    </>
  );
}

export default App;
