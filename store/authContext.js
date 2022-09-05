import { createContext, useCallback, useContext, useMemo, useState } from "react";

const context = createContext();


export const useAuthContext = () => {
  const authContext = useContext(context);
  return authContext;
}

export const AuthProvider = ({
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setIsLoggedInHandler = useCallback((_isLoggedIn) => {
    setIsLoggedIn(_isLoggedIn);
  }, []);

  const setUserHandler = useCallback((_user) => {
    setUser(_user);
  }, []);

  const value = useMemo(() => ({
    isLoggedIn, 
    setIsLoggedInHandler,
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