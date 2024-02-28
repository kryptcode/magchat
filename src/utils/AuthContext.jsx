import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUseronLoad();
  }, []);

  const getUseronLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  async function handleUserLogin(e, credentials) {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
      // console.log(response);

      const accountDetails = await account.get();
      setUser(accountDetails);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUserLogout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function handleUserRegister(e, credentials) {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("Passwords do not match!!!");
      return;
    }

    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      await account.createEmailSession(credentials.email, credentials.password1)

      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");

      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
