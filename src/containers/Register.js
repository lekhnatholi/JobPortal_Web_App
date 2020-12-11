import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { apiPath } from "../utils/Consts";

/** Presentation */
import ErrorMessage from "../components/ErrorMessage";
/** Custom Hooks */
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
/** Utils */
import {
  apiRequest,
  validateRegisterForm,
  printError,
  removeError,
} from "../utils/Helpers";
import SignupHeader from "./SignupHeader";
import Axios from "axios";

const Register = (props) => {
  const [userFirstName, setFirstName] = React.useState("");
  const [userLastName, setLastName] = React.useState("");
  const [compnayName, setCompanyName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userConfirmPassword, setConfirmPassword] = React.useState("");
  const [userEntity, setUserEntity] = React.useState("jobseeker");
  const [loading, setLoading] = React.useState(false);
  const { error, showError } = useErrorHandler(null);
  const isUserEntityJobseeker = userEntity === "jobseeker" ? true : false;

  const registerHandler = async () => {
    setLoading(true);
    removeError();

    try {
      const options = {
        method: "POST",
        url: `${apiPath}/userRegister`,
        data: {
          first_name: userFirstName,
          last_name: userLastName,
          name: compnayName,
          email: userEmail,
          password: userPassword,
          password_confirmation: userConfirmPassword,
          entity: userEntity,
        },
      };

      const data = await Axios(options);
      data
        .then((response) => {
          if (response.data.resp === 1) {
            setFirstName("");
            setLastName("");
            setCompanyName("");
            setUserEmail("");
            setUserPassword("");
            setConfirmPassword("");
            alert(response.data.message);
          } else {
            showError(response.data.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            const { data, status } = err.response;

            if (status === 422) {
              alert("Please correct highlighted erros");
              printError(data);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="content-wrapper border mt-5">
        <SignupHeader
          action="Register"
          isUserEntityJobseeker={isUserEntityJobseeker}
          setUserEntity={setUserEntity}
        />

        <div className="login-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                validateRegisterForm(
                  userEmail,
                  userPassword,
                  userConfirmPassword,
                  showError
                )
              ) {
                registerHandler();
              }
            }}
          >
            {error && <ErrorMessage errorMessage={error} />}

            {isUserEntityJobseeker ? (
              <div className="row my-30">
                <div className="col-lg-6">
                  <div className="form-group m-lg-0 mb-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control p-4"
                      name="first_name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={userFirstName}
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group m-0">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control  p-4"
                      name="last_name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={userLastName}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-group my-30">
                <input
                  type="text"
                  name="comapany_name"
                  placeholder="Company Name"
                  className="form-control p-4"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={compnayName}
                />
              </div>
            )}

            <div className="form-group my-30">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control p-4"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
            </div>

            <div className="form-group my-30">
              <input
                type="password"
                placeholder="Password"
                className="form-control  p-4"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
            </div>

            <div className="form-group my-30">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control  p-4"
                name="password_confirmation"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={userConfirmPassword}
              />
            </div>

            <div className="form-submit text-center mt-30 mb-3">
              <button className="primary submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

            <div className="here text-center">
              Already have an account? Login{" "}
              <Link to="/login">
                <u>here</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
