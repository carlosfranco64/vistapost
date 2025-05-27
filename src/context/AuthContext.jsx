import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [size, setSize] = useState([]);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {

  setIsAuthenticated(false);
  setLoading(false)
         return setUser(null);

      }
        try {
          const res = await verifyTokenRequest(cookies.token);
          // console.log(res);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false)
            return
            
          }
          
          
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false)
          
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false)
        }
      
    }

    checkLogin();
  }, []);

  const signup = async (values) => {
    try {
      const res = await registerRequest(values);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const signin = async (values) => {
    try {
      const res = await loginRequest(values);
      setIsAuthenticated(true);
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);

      if (Array.isArray(error.response.data)) {
        setError(error.response.data.message);
      }
      setError([error.response.data.message]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        user,
        isAuthenticated,
        error,
        setSize,
        size
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
