import React, { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggin, setIsloggin] = useState(false);
  useEffect(() => {
    const sessionUser = localStorage.getItem("username");
    if (sessionUser) {
      setIsloggin(true);
    }
  }, []);

  const HandlingLogin = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("personId");

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("sessionUser", username); // Set session key
      setIsloggin(true);
    } else {
      alert("Invalid Credentials.");
      setUsername("");
      setPassword("");
    }
  };
  const HandlingLogout = () => {
    localStorage.removeItem("sessionUser");
    setIsloggin(false);
    setUsername("");
    setPassword("");
  };
  return (
    <div className="LoginForm">
      {isLoggin ? (
        <div>
          <h2>Welcome,{localStorage.getItem("username")}!</h2>
          <button onClick={HandlingLogout}>LogOut</button>
        </div>
      ) : (
        <form onSubmit={HandlingLogin}>
          <div className="tablediv">
            <h1>Login Here</h1>
            <table className="table" align="center">
              <tr>
                <td>
                  <label>User Name :</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password :</label>
                </td>
                <td>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr align="center">
                <td colspan="2">
                  <button type="submit"> SUBMIT</button>
                </td>
              </tr>
            </table>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
