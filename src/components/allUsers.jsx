import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../api";
import { UserContext } from "../context/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.users);
    });
  }, []);

  return (
    <div>
      <h1 id="users-title">Users:</h1>
      <ul id="users-list">
        {users.map((user) => {
          return (
            <li key={user.username}>
              <h3>{user.username}</h3>
              <img src={user.avatar_url} alt={user.username}></img>
              <br />
              <br />
              <button
                onClick={() => {
                  setCurrentUser(user);
                }}
              >
                Select user
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
