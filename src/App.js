import { useEffect, useState } from "react";
import "./styles.css";
import { addData, updateData, deleteData, getData } from "./firebase-config";

export default function App() {
  const [newUser, setNewUser] = useState({});
  const [updUser, setUpdUser] = useState({});
  const [users, setUsers] = useState([]);

  const addUser = async () => {
    await addData("users", { email: newUser.email }).then((data) => {
      setUsers(data);
      setNewUser("");
    });
  };

  const updateUser = async (id) => {
    await updateData("users", id, { email: updUser.email }).then((data) => {
      setUsers(data);
    });
  };

  const deleteUser = async (id) => {
    await deleteData("users", id).then((data) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    getData("users").then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="App">
      <div className="newUserForm">
        <input
          placeholder="User email"
          onChange={(event) => {
            setNewUser({ email: event.target.value });
          }}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div className="users-list">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h1>{user.email}</h1>
              <input
                placeholder="new email"
                onChange={(event) => {
                  setUpdUser({ email: event.target.value });
                }}
              />
              <button
                onClick={() => {
                  updateUser(user.id);
                }}
              >
                Update
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
