import {useState, useEffect} from "react";
import { selectCurrentToken } from "../../slices/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useLocation, Link } from "react-router-dom";
import { Outlet } from "react-router";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest2-api.onrender.com";
import ErrorMiddleware from "./ErrorMiddleware";
const RequireEditor = () => {
  const token = useSelector(selectCurrentToken);
  const [errMsg, setErrMsg] = useState("");
  const [isEditor, setIsEditor] = useState(false);
  useEffect(() => {
    const detAdmin = async  () => {
        try {
            const res = await axios.get(`${BASE_URL}/jwt/protectAdmin`, 
                {headers: {withCredentials: true, Authorization: `Bearer ${token}`}});
            //console.log(res.data.user.role.isEditor);
            setIsEditor(res.data.user.role.isEditor);
        }catch(err) {
            //console.log(err);
            setErrMsg(err?.response?.data?.message);
        }
    }
    detAdmin();
  }, [])
  return (
    <div>
        {isEditor ? 
            <Outlet/> :
            <ErrorMiddleware key={errMsg} errMsg={errMsg} />
        }  
    </div>
  )
}

export default RequireEditor