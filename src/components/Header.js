import React, { useState, useEffect } from "react";
import "../css/Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from "react-router-dom";
import { Redirect, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isLogout, setIsLogout] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const location = useLocation();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[token]]);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const logout = () => {
    // dispatch({type: LOGOUT, data: null})
    setIsLogout(true);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    window.location.reload()
  };
  const linkAction = (id, status) => {
    const navLink = document.querySelectorAll(".nav__link");
    navLink.forEach((n) => n.classList.remove("active"));
    if (id) {
      const _this = document.getElementById(id);
      _this.classList.add("active");
    }

    if (status === true) {
      const toggle = document.getElementById("header-toggle");
      const nav = document.getElementById("nav-menu");
      if (nav && toggle) {
        toggle.classList.remove("bx-x");
        nav.classList.remove("show");
      }
    }
  };
  return ( isLogout )? (
    <Redirect to="/" />
  ) : (
    <header className="header">
      <nav className="navbar head" id="nav-menu">
      <Link
        className="nav__perfil"
        to="/"
        onClick={() => linkAction(null, true)}
      >
        <div className="navbar-brand">
          <img src="/image/logo.png" alt="notfound" className="logo"/></div>
      </Link>
        <div className="nav__content bd-grid">
          <div className="nav__menu">
            <ul className="list-unstyled">
              {!token ? (
                <li className="nav_item">
                  <Link
                    id="contact"
                    className="btn loginbtn"
                    to={`/login`}
                    onClick={() => linkAction("contact", true)}
                  >
                    <div style={{ textAlign: "center", color: "#fff" }}>
                      ĐĂNG NHẬP
                    </div>
                  </Link>
                </li>
              ) : (
                <li className="nav_item dropdown">
                  <div id="userSection" >
                    <div className="userlogin nav-link dropdown-toggle" style={{cursor:'pointer'} } data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle" style={{marginRight:"10px"}}></i>
                      {username}
                    </div>
                    <ul className="dropdown-menu">
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown_item"
                    >
                      <Link to={'/Order/'}>
                      <div className="dropdown-item">
                        <FontAwesomeIcon icon={faBagShopping} style={{marginRight:"2px"}}/>
                        Giỏ Hàng</div>
                        </Link>
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown_item"
                      onClick={() => logout()}
                    >
                      <div className="dropdown-item">
                        <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight:"2px"}}/>
                        Đăng xuất</div>
                    </li>
                  </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
