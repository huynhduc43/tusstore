import React, { useState } from "react";
import { createContext, useContext } from "react";

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [commentPage, setCommentPage] = useState("");

  const signin = (data) => {
    setUser(data);
  };

  const signout = () => {
    setUser(null);
  };

  return {
    user,
    commentPage,
    setCommentPage,
    signin,
    signout,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}