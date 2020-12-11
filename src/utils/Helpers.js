import * as validator from "validator";
import { DEFAULT_USER_AUTH } from "./Consts";
import moment from "moment";

/** Return user auth from local storage value */
export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }

  return DEFAULT_USER_AUTH;
};

/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 */
export const apiRequest = async (url, method, bodyParams) => {
  const auth = JSON.parse(window.localStorage.getItem("UserAuth"));
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth ? auth.token : null,
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined,
  });
  return await response.json();
};

/** Handle form validation for the login form */
export const validateLoginForm = (email, password, setError) => {
  // Check for undefined or empty input fields
  if (!email || !password) {
    setError("Please enter a valid email and password.");
    return false;
  }
  // Validate email
  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  return true;
};

/** Handle form validation for the register form */
export const validateRegisterForm = (
  email,
  password,
  confirmPassword,
  setError
) => {
  // Check for undefined or empty input fields
  if (!email) {
    setError("Email field is required");
    return false;
  }

  if (!password) {
    setError("Password field is required");
    return false;
  }

  if (!confirmPassword) {
    setError("Password confirmation field is required");
    return false;
  }

  // Validate email
  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  return true;
};

/** Handle form validation for the register form */
export const validatePostNewJob = (fileds, setError) => {
  // Check for undefined or empty input fields
  if (!fileds.title) {
    setError("Job Title is required");
    return false;
  }

  if (!fileds.category) {
    setError("Category is required");
    return false;
  }

  if (!fileds.expiry_date) {
    setError("Expiry date is required");
    return false;
  }

  if (!moment(fileds.expiry_date, ["YYYY-MM-DD", "YYYY-M-D"], true).isValid()) {
    setError("Expiry date format must match YYYY-MM-DD");
    return false;
  }

  return true;
};

//print erros thrown by server validation
export const printError = (errors) => {
  let entries = Object.entries(errors);

  for (const [key, value] of entries) {
    var para = document.createElement("p");
    var node = document.createTextNode(value);
    var att = document.createAttribute("class");
    att.value = "text-danger mt-2 is-invalid";
    para.appendChild(node);
    para.setAttributeNode(att);

    let inputElemet = document.querySelector(`input[name="${key}"]`);
    let selectElemet = document.querySelector(`select[name="${key}"]`);
    let textareaElemet = document.querySelector(`textarea[name="${key}"]`);

    if (inputElemet) {
      inputElemet.parentNode.appendChild(para);
    } else if (selectElemet) {
      selectElemet.parentNode.appendChild(para);
    } else if (textareaElemet) {
      textareaElemet.parentNode.appendChild(para);
    }
  }
};

//clear server validation errors
export const removeError = () => {
  var errors = document.querySelectorAll(".is-invalid");
  for (var item of errors) {
    item.remove();
  }
};

// export const showLoginInvalid = () => {
//   var para = document.createElement("p");
//   var node = document.createTextNode("Invalid email or password");
//   var att = document.createAttribute("class");
//   att.value = "text-danger mt-2 is-invalid";
//   para.appendChild(node);
//   para.setAttributeNode(att);

//   let inputElemet = document.querySelector(".login-form");

//   if (inputElemet) {
//     inputElemet.insertBefore(para, inputElemet.firstChild);
//   }
// };

//confirm on delete
export const confirmDelete = () => {
  return window.confirm("Are you sure to delete it?");
};
