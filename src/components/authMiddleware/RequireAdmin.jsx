import {useState, useEffect} from "react";
import { selectCurrentToken } from "../../slices/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useLocation, Link } from "react-router-dom";
import { Outlet } from "react-router";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest2-api.onrender.com";
import ErrorMiddleware from "./ErrorMiddleware";
const RequireAdmin = () => {
  const token = useSelector(selectCurrentToken);
  const [errMsg, setErrMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //console.log("token: ", token);
  useEffect(() => {
    const detAdmin = async  () => {
        try {
            const res = await axios.get(`${BASE_URL}/jwt/protectAdmin`, 
                {headers: {withCredentials: true, Authorization: `Bearer ${token}`}});
            //console.log(res.data);
            setIsAdmin(res.data.user.role.isAdmin);
        }catch(err) {
            //console.log(err?.data);
            setErrMsg(err?.response?.data?.message);
        }
    }
    detAdmin();
  }, [token])
  return (
    <div>
        {isAdmin ? 
            <Outlet/> :
            <ErrorMiddleware key={errMsg} errMsg={errMsg} />
        }  
    </div>
  )
}

export default RequireAdmin
