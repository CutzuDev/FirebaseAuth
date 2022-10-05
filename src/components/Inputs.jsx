import { useEffect, useState } from "react";

function Inputs({ auth, registerUser, loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailAndPassword = email && password;

  useEffect(() => {
    const delayFn = setTimeout(() => {
      setEmail(email);
    }, 2000);

    return () => clearTimeout(delayFn);
  }, [email]);

  useEffect(() => {
    const delayFn = setTimeout(() => {
      setPassword(password);
    }, 1500);

    return () => clearTimeout(delayFn);
  }, [password]);

  function register() {
    emailAndPassword
      ? registerUser(auth, email, password)
      : alert("Failed! Please provide email or password!");
  }

  function login() {
    emailAndPassword
      ? loginUser(auth, email, password)
      : alert("Failed! Please provide email or password!");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="input__container">
          <h2 className="input__title">Please input your credentials</h2>
          <div className="input__form">
            <input
              type="text"
              className="input__email input"
              placeholder="Email@email.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <input
              type="password"
              className="input__password input"
              placeholder="********"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <div className="input__submits">
              <button
                className="input__submit submit hover"
                onClick={() => register()}
              >
                Register!
              </button>
              <button
                className="input__submit submit hover"
                onClick={() => login()}
              >
                Login!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
