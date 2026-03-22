import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 👇 AQUI entra o useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ username: "usuário" }); // depois vamos melhorar isso
    }
  }, []);

  const login = (credentials) => {
    const token = btoa(credentials.username + ":" + credentials.password);

    localStorage.setItem("token", token);

    setUser({
      username: credentials.username,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};