import React, { useState, useContext } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../images/logo.png";
import axios from "axios";

function SecondayNavbar(props) {
  //fetch auth user email and handle logout
  const { auth, setUnauthStatus } = useContext(AuthContext);
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleDropdownMenu = function () {
    setDisplayMenu(!displayMenu);
  };

  const handleLogout = (event) => {
    event.preventDefault();

    const apiPath = process.env.REACT_APP_API_URL;
    axios
      .post(apiPath + "/logout")
      .then((respose) => {
       
      })
      .catch((error) => {
        console.log(error);
      });

      //clear user state form cache
       setUnauthStatus();
       return <Redirect to="/login" />;
  };

  return (
    <section className="seconday-navabar top-bar">
      <div className="Container">
        <div className="row no-gutters justify-content-between pr-lg-3 mr-3 mr-lg-0">
          <div className="col-6 col-lg-3">
            <div className="logo-box float-left">
              <Link to="/">
                <img className="card-img-top" src={Logo} alt="Card" />
              </Link>
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className="jobseeker-name text-right">
              {/* if hasDropdownMenu is true which is for employer and jobseeker routes */}
              {props.hasDropdownMenu === "true" ? (
                <div>
                  <div className="d-block d-lg-none mobile-menu">
                    <div onClick={toggleDropdownMenu}>
                      <i className="fas fa-bars"></i>
                    </div>
                  </div>
                  <div className="d-none d-lg-block">
                    <div className="menu-dropdown" onClick={toggleDropdownMenu}>
                      Hello,{" "}
                      <i style={{ fontSize: "18px", color: "#1771c4" }}>
                        {auth.email ? auth.email : "______"}
                      </i>
                    </div>
                  </div>

                  {displayMenu ? (
                    <ul>
                      <li>
                        <Link to={`${props.match.url}/change-password`}>
                          {" "}
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <a href="#Create Ads" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : (
                <div>
                  <div className="d-block d-lg-none mobile-menu">
                    <div>
                      <i className="fas fa-bars"></i>
                    </div>
                  </div>
                  <div className="d-none d-lg-block">
                    <div className="guest-highlight">Hello, Guest</div>
                  </div>
                </div>
              )}
              {/* if hasDropdownMenu is false which is for register and login routes */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(SecondayNavbar);
