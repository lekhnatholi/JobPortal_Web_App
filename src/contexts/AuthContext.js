import * as React from "react";
/** Custom Hooks */
import useAuthHandler from "../utils/custom-hooks/AuthHandler";
/** Utils */
import { DEFAULT_USER_AUTH } from "../utils/Consts";
import { getStoredUserAuth } from "../utils/Helpers";

export const AuthContext =
  React.createContext (
  {
    auth: DEFAULT_USER_AUTH,
    setAuthStatus: () => {},
    setUnauthStatus: () => {},
  });

//   console.log(AuthContext);
const { Provider } = AuthContext;

const AuthProvider = ({
  children,
}) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler(
    getStoredUserAuth() // reutrn default auth user value
  );
  console.log(auth);
  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );
};
export default AuthProvider;
