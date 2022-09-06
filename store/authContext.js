import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setAxios } from "../http/axios";

const context = createContext();


export const useAuthContext = () => {
  const authContext = useContext(context);
  return authContext;
}

export const AuthProvider = ({
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("setting session")
    const session = window.localStorage.getItem("session");
    if (session) {
      setAxios(session);
    }
  }, []);

  const setIsLoggedInHandler = useCallback((_isLoggedIn) => {
    setIsLoggedIn(_isLoggedIn);
  }, []);

  const setTokenHandler = useCallback((_token) => {
    setToken(_token);
  }, []);

  const setUserHandler = useCallback((_user) => {
    setUser(_user);
  }, []);

  const value = useMemo(() => ({
    isLoggedIn, 
    setIsLoggedInHandler,
    token,
    setTokenHandler,
    user,
    setUserHandler
  }), [
    isLoggedIn, 
    setIsLoggedInHandler,
    user,
    setUserHandler
  ])

  return (<>
    <context.Provider value={value}>
      {children}
    </context.Provider>
  </>)
}