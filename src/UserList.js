import React, { useEffect } from "react";

function UserList({ users, onRemove, onToggle }) {
  useEffect(() => {
    console.log("컴퍼넌트가 화면에 나타남 ");
  }, []);

  return (
    <div>
      {users.map((user) => {
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
      })}
    </div>
  );
}

export default UserList;
