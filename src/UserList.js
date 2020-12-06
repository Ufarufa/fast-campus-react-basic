import React, { useEffect, useContext } from "react";
import { UserDipspatch } from ".App";

const test = (f) => f;

const User = React.memo(function User({ user }) {
  console.log("User");
  const dispatch = useContext(UserDipspatch);

  return (
    <p>
      <b
        onClick={() =>
          dispatch({
            type: "TOGGLE_USER",
            id: user.id,
          })
        }
        style={{
          color: user.active ? "green" : "black",
          cursor: "pointer",
        }}
      >
        {user.username} :{" "}
      </b>
      <span>{user.email}</span>
      <button
        onClick={() =>
          dispatch({
            type: "REMOVE_USER",
            id: user.id,
          })
        }
      >
        삭제
      </button>
    </p>
  );
});

function UserList({ users }) {
  useEffect(() => {
    console.log("컴퍼넌트가 화면에 나타남 ");
  }, []);

  return (
    <div>
      {users.map((user) => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
}

export default React.memo(UserList);
