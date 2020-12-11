import React, { useState, useContext, useEffect } from "react";
import { Link, matchPath, withRouter, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../images/logo.png";
import axios from "axios";
import { apiPath } from "../utils/Consts";

function Navbar({ history, match, location }) {
  //fetch auth user and handle logout
  const { auth, setUnauthStatus } = useContext(AuthContext);
  const [displayMenu, setDisplayMenu] = useState(false);

  const isAuthenticated = auth.email ? true : false;
  const entity = auth.entity;

  useEffect(() => {
    if (displayMenu) {
      setDisplayMenu(false);
    }
  }, [location]);

  const toggleDropdownMenu = function () {
    setDisplayMenu(!displayMenu);
  };

  const getIsAuthRouteStatus = (pathname) => {
    const matchEmployer = matchPath(pathname, {
      path: `/employer`,
      exact: false,
    });

    const matchJobseeker = matchPath(pathname, {
      path: `/jobseeker`,
      exact: false,
    });

    return matchEmployer || matchJobseeker ? true : false;
  };

  const { pathname } = location;
  const isAuthRoute = getIsAuthRouteStatus(pathname);

  const handleLogout = (event) => {
    event.preventDefault();

    axios.post(apiPath + "/logout").catch((error) => {
      console.log(error);
    });

    //clear auth user state form cache
    setUnauthStatus().then(() => {
        history.push("/");
    });
    
  };

  return (
    <section className="Navbar top-sticky">
      <div className="Container">
        <div className="row justify-content-between mx-0">
          <div className="col-6 col-lg-3">
            <div className="Navbar__logo-box">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-6 col-lg-4">
            {/* desktop menu */}
            <div className="desktop-menu-wrapper d-none d-lg-block">
              {isAuthenticated ? (
                <div>
                  {isAuthRoute ? (
                    <div className="entity-panel text-right">
                      {/* // dropdown menu for employer and jobseeker (auth)
                      protected routes start */}
                      <div
                        className="menu-dropdown"
                        onClick={toggleDropdownMenu}
                      >
                        Hello,{" "}
                        <i style={{ fontSize: "18px", color: "#1771c4" }}>
                          {auth.email ? auth.email : "______"}
                        </i>
                      </div>
                      {displayMenu ? (
                        <ul>
                          <li>
                            <Link to={`/${entity}/change-password`}>
                              Change Password
                            </Link>
                          </li>
                          <li>
                            <a href="#x" onClick={handleLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      ) : null}
                      {/* // dropdown menu for employer and jobseeker (auth)
                      protected routes end */}
                    </div>
                  ) : (
                    <div className="default-menu">
                      {/* // inline menu for unprotected routes  start*/}
                      <ul>
                        <li>
                          <Link to={`/${entity}`}>
                            <i>My Account</i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/logout"
                            className="logout"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                      {/* // inline menu for unprotected routes  end*/}
                    </div>
                  )}
                </div>
              ) : (
                <div className="default-menu">
                  <ul>
                    <li>
                      <NavLink to="/register"> Register</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login"> Login</NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* desktop menu end*/}

            {/* mobile menu start*/}
            <div className="mobile-menu-wrapper text-right d-block d-lg-none ">
              <div className="mobile-menu">
                <div onClick={toggleDropdownMenu}>
                  <i className="fas fa-bars"></i>
                </div>
              </div>
              {displayMenu && (
                <div>
                  {isAuthenticated ? (
                    <div>
                      {isAuthRoute ? (
                        <div>
                          {/* // inline menu for unprotected routes  start*/}
                          <ul>
                            <li>
                              <Link to={`/${entity}/change-password`}>
                                Change Password
                              </Link>
                            </li>
                            <li>
                              <a href="#x" onClick={handleLogout}>
                                Logout
                              </a>
                            </li>
                          </ul>
                          {/* // inline menu for unprotected routes  end*/}
                        </div>
                      ) : (
                        <ul>
                          <li>
                            <Link to={`/${entity}`}> My Account</Link>
                          </li>
                          <li>
                            <Link to="/logout" onClick={handleLogout}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <ul>
                      <li>
                        <Link to="/register"> Register</Link>
                      </li>
                      <li>
                        <Link to="/login"> Login</Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            {/* mobile menu end*/}
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Navbar);
