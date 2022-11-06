import { useContext } from "react";
import AppContext from "../context/AppContext";
import AuthContext from "../context/AuthContext";

const useAuth = () => useContext(AuthContext)

export default useAuth