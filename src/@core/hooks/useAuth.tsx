import {useContext} from "react";
import {AuthContext} from "@/@core/context/AuthContext";

export const useAuth = () => useContext(AuthContext);
