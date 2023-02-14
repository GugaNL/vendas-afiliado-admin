import React, { createContext, useState, useContext } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem("@vendas-afiliados-admin:logged");

    return !!isLogged; //retorno lógico, verifica se tem conteúdo então é verdadeiro, caso não tenha então é falso
  });
  const [userName, setUserName] = useState('');

  const signIn = async (email, password) => {
    const response = await loginUser(email, password);
    const { data: responseLogin = {} } = response;

    if (responseLogin && responseLogin.success) {
      const { data: { usuario: { login = ""} = {}, token = "" } = {} } = responseLogin;
      localStorage.setItem("@vendas-afiliados-admin:logged", "true");
      localStorage.setItem("@vendas-afiliados-admin:user", login);
      localStorage.setItem("@vendas-afiliados-admin:token", token);
      setUserName(login);
      setLogged(true);
    } else {
      setLogged(true)
      alert("Email ou senha inválido(s)!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@vendas-afiliados-admin:logged");
    localStorage.removeItem("@vendas-afiliados-admin:user");
    localStorage.removeItem("@vendas-afiliados-admin:token");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, userName, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
