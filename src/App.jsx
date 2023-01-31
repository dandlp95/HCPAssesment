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

  // If there are issues calling the api, verify that the server is running on this url and change it accordingly.
  const rootUrl = "https://localhost:5000"
  const url = rootUrl + "/api/user";

  const getUsers = async () => {
    const options = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setUsers(data.result);
      setDisabledGetBtn(true);
      setDisabledPostBtn(false);
    } else {
      alert("Some error happened.");
    }
  };

  const postUsers = async () => {
    if (user && password) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userid: user,
          password: password,
          outputtype: "Json",
          users: users,
        }),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        alert("Data succesfully posted!");
      } else {
        alert(JSON.stringify((await response.json()).result));
      }
    } else {
      alert("Please enter userid and password");
    }
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
          <form onSubmit={(e) => e.preventDefault}>
            <div className={AppCSS.inFormContainer}>
              <div className={AppCSS.credentialsInputDiv}>
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
              <div className={AppCSS.credentialsInputDiv}>
                <input
                  required
                  type="text"
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
