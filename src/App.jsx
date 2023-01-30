import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Button from "./components/button";
import UserContainer from "./components/userContainer";

function App() {
  const [disabledGetBtn, setDisabledGetBtn] = useState(false);
  const [disabledPostBtn, setDisabledPostBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const url = "https://localhost:7029/api/user";

  const getUsers = async () => {
    const options = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
      setDisabledGetBtn(true);
      setDisabledPostBtn(false);
    }
  };

  const postUsers = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: "dadelapema@gmail.com",
        password: "a62fbd46febd48e7a4d30a551922e9e5",
        outputtype: "Json",
        users: users,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      alert("Data succesfully posted!");
    } else {
      alert("Some error happened");
    }
    setDisabledPostBtn(true);
  };

  const reset = () => {
    setUsers([]);
    setDisabledGetBtn(false);
    setDisabledPostBtn(true);
  };

  return (
    <div className={AppCSS.AppCSS}>
      <div className={AppCSS.grid}>
        <div className={AppCSS.firstGrid}>
          <h2>Home Care Pulse Assesment</h2>
          {/* <form>
            <div>
              <div>
                <input
                  required
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  name="user"
                />
                <label for="user">Userid: </label>
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="password">Password: </label>
              </div>
            </div>
          </form> */}
          <form onSubmit={(e) => e.preventDefault} className={AppCSS.loginForm}>
            <div className={AppCSS.inFormContainer}>
              <div className={AppCSS.loginInputDiv}>
                <input
                  required
                  type="text"
                  onChange={(e) => setUser(e.target.value)}
                  name="loginName"
                />
                <label for="loginName" className={AppCSS.floatingLabel}>
                  Username:{" "}
                </label>
              </div>
              <div className={AppCSS.loginInputDiv}>
                <input
                  required
                  type="password"
                  name="lPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="lPassword" className={AppCSS.floatingLabel}>
                  Password:{" "}
                </label>
              </div>
            </div>
          </form>
          <div className={AppCSS.buttons}>
            <Button
              text="Get Users"
              disabledBtn={disabledGetBtn}
              action={getUsers}
            />
            <Button
              text="Post Users"
              disabledBtn={disabledPostBtn}
              action={postUsers}
            />
            <div className={AppCSS.reset} onClick={() => reset()}>
              Reset
            </div>
          </div>
        </div>
        <div className={AppCSS.secondGrid}>
          <div className={AppCSS.users}>
            {users && users.map((user) => <UserContainer user={user} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
