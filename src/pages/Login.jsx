import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password)
  };

  return (
    <div className="container min-vh-75 d-flex flex-column align-items-center justify-content-center">
      <div className="row">
        <div className="min-vw-25 bg-light-darker text-dark rounded text-center py-3 px-4">
          <form onSubmit={handleSubmit}>
            <h3>LOGIN</h3>
            <label htmlFor="email" className="d-block mt-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-2 rounded col-12"
            />

            <label htmlFor="password" className="d-block mt-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-2 rounded col-12"
            />

            <button className="d-block mx-auto mt-3 btn btn-dark" disabled={isLoading}>
              Login
            </button>

            <a href="/signup" className="mt-2 d-inline-block">
              Not registered yet?
            </a>
          </form>
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
