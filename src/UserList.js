import React, { useEffect } from "react";

const test = (f) => f;

const User = React.memo(function User({ user, onToggle, onRemove }) {
  console.log("User");

  return (
    <p>
      <b
        onClick={() => onToggle(user.id)}
        style={{
          color: user.active ? "green" : "black",
          cursor: "pointer",
        }}
      >
        {user.username} :{" "}
      </b>
      <span>{user.email}</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </p>
  );
});

function UserList({ users, onRemove, onToggle }) {
  useEffect(() => {
    console.log("컴퍼넌트가 화면에 나타남 ");
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
}

export default React.memo(UserList);
