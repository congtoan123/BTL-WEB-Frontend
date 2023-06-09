import React, { useState, useEffect } from "react";
import "../css/login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/actions/login";
import { Redirect, useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [loginOrSignUp, setLoginOrSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const success = useSelector((state) => state.login.success);
  const message = useSelector(state => state.login.message)
  const dataLogin = useSelector((state) => state.login.data);
  const onFocusInput = (e) => {
    const tempClassName = e.target.parentElement.classList[1];
    if (tempClassName) {
      e.target.parentElement.classList.remove(tempClassName);
    }
  };
  const signIn = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    dispatch(login(data));
    setLoginOrSignUp(true);
  };
  const signUp = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      roles:"user"
    };
    if (location.pathname === "/login") console.log(data);
    dispatch(signup(data));
    setLoginOrSignUp(false);
  };
  const toggleLogin = (mode) => {
    const loginIn = document.getElementById("login-in");
    const loginUp = document.getElementById("login-up");
    if (mode === "signUpMode") {
      loginIn.classList.remove("block");
      loginUp.classList.remove("none");
      // Add classes
      loginIn.classList.toggle("none");
      loginUp.classList.toggle("block");
    } else {
      loginIn.classList.remove("none");
      loginUp.classList.remove("block");
      // Add classes
      loginIn.classList.toggle("block");
      loginUp.classList.toggle("none");
    }
  };
  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="login">
      <div className="login__content">
      <div className="msg-log">MSG LOG</div>
        <div className="login__forms">
          <form className="login__registre" id="login-in" >
            <h1 className="login__title">Đăng nhập</h1>
            <div className="login__box">
              <i className="bx bx-user login__icon" />
              <input
                onFocus={onFocusInput}
                type="text"
                placeholder="Username"
                className="login__input"
                onChange={(e) => setUsername(e.target.value)}
                id="username-up"
                required
              />
            </div>
            <div className="login__box">
              <i className="bx bx-lock-alt login__icon" />
              <input
                onFocus={onFocusInput}
                type="password"
                name="password"
                placeholder="Password"
                className="login__input"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
            </div>
            <button onClick={(e) => signIn(e)} className="login__button">
              Đăng nhập
            </button>
            <div>
              <span className="login__account">Bạn chưa có tài khoản? </span>
              <span
                className="login__signin"
                id="sign-up"
                onClick={() => toggleLogin("signUpMode")}
              >
                Đăng kí
              </span>
            </div>
            { message!=="" && <div className="message">{message}</div>}
          </form>
          <form className="login__create none" id="login-up">
            <h1 className="login__title">Tạo tài khoản</h1>
            <div className="login__box">
              <i className="bx bx-user login__icon" />
              <input
                onFocus={onFocusInput}
                type="text"
                placeholder="Username"
                className="login__input"
                onChange={(e) => setUsername(e.target.value)}
                id="username-up"
              />
            </div>
            <div className="login__box">
              <i className="bx bx-lock-alt login__icon" />
              <input
                onFocus={onFocusInput}
                type="password"
                name="password"
                placeholder="Password"
                className="login__input"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                id="password-up"
              />
            </div>
            <button onClick={(e) => signUp(e)} className="login__button">
              Đăng kí
            </button>
            <div>
              <span className="login__account">Bạn đã có tài khoản? </span>
              <span
                className="login__signup"
                id="sign-in"
                onClick={() => toggleLogin("signInMode")}
              >
                Đăng nhập
              </span>
            </div>
            { message!=="" && error && <div className="message">{message}</div>}
            { message!==""&& success && <div className="message-suc">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
