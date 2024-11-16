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
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      setIsloggin(true);
    } else {
      alert("Invalid Credentials....");
    }
  };
  const HandlingLogout = () => {
    localStorage.removeItem("username");
    setIsloggin(false);
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
