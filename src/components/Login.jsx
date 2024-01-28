import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import FacebookLogo from "../assets/facebook.png";
import GoogleLogo from "../assets/google.png";
import GithubLogo from "../assets/github.png";

import {useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from "../slices/auth/usersApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const Login = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState("");
  const [success, setSucess] = useState(false);
  const [hi, setHi] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading} ] = useLoginMutation();
  const {token} = useSelector((state) => state.auth);
  //console.log("tokenxx: ", token);
  const[showPassword, setShowPassword] = useState("");
 
  const handleShowPassword = (e) => {
    e.preventDefault();
    showPassword ? setShowPassword(false) : setShowPassword(true);
    //console.log(setShowPassword);
  };
  
  useEffect(() => { 
    if(token) {
      navigate('/');
    }
  }, [navigate, token]);



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      //console.log(res);
      dispatch(setCredentials({...res}));
      navigate("/");
    }catch(error) {
      //console.log(error?.data?.message || error.error);
      setErrMessage(error?.data?.message);
      setSucess(false);
      setTimeout(()=>{
        setHi("");
      }, [2000]);
    }
    // prevent
  }

  const Google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  }

  return (
    <section className="bg-indigo-100 h-screen">
      <form
        className=" h-5/6 md:w-6/12 md:ml-64 bg-white border ml-3 shadow-xl shadow-indigo-300 rounded flex-col "
        action="./register"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mt-5 mb-5 italic text-2xl">
          Choose a Login Method
        </h2>     
      {errMessage ? <h1 className="font-medium text-center my-3 text-xl text-red-400 md:text-lg ">{errMessage}</h1> : null}
      {success ? <h1 className="font-medium text-center my-3 text-xl text-blue-800 md:text-lg ">{success}</h1> : null}
      {hi ? null : null}
        <p className="mb-5 mt-3 text-center">
          Don't have an account ?{" "}
          <Link to="/register" className="bg-purple-200 rounded">
            Sign Up
          </Link>
        </p>

        
        <div onClick={Google} >
          <div className=" mb-2 relative p-5 bg-slate-50 hover:bg-slate-200 cursor-pointer" onClick={Google}>
            <img
              className="absolute top-0 left-14  h-8 "
              src={GoogleLogo}
              alt="google"
            />
            <span className="absolute top-2 left-24">
              <p to="">Continue with Google</p>
            </span>
          </div>

        <div className="mb-2 relative p-5 bg-slate-50 hover:bg-slate-200 cursor-pointer">
          <img
            className="absolute top-0 left-14  h-9 "
            src={FacebookLogo}
            alt="facebook"
          />
          <span className="absolute top-2 left-24">
            <Link to="/auth/facebook">Continue with Facebook</Link>
          </span>
        </div>

        <div className=" cursor-pointer mb-7 relative p-5 bg-slate-50 hover:bg-slate-200">
          <img
            className="absolute top-0 left-14  h-8"
            src={GithubLogo}
            alt="github"
          />
          <span className="absolute top-2 left-24 ">
            <Link to="/auth/github">Continue with Github</Link>
          </span>
        </div>
      </div>

      <div className=" mb-9 relative ">
        <p className="absolute top-0 left-4  h-1 w-48  bg-slate-500  "></p>
        <h1 className="absolute left-52 -top-5 text-4xl  shadow rounded text-indigo-600  ">OR</h1>
        <p className="absolute top-0 right-5  h-1 w-48  bg-slate-500 md:right-48 lg:right-52 "></p>
      </div>

      <div className="form-group p-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full h-8 text-blue-600"
        />
      </div>

      <div className="form-group p-2">
        {showPassword ? (
          <div className="">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type="text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full h-8 text-blue-600"
                placeholder="Password"
              />

              <div className="absolute top-2 ml-80 md:ml-96 ">
                <button type="button" onClick={handleShowPassword}>
                  <FaRegEye />
                </button>
              </div>
            </div>
          </div>
          ) : (
          <div className="">
            <label htmlFor="password">Password</label>
              <div className="relative">
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full h-8 text-blue-600"
              />
              <div className="absolute top-2 ml-80 md:ml-96">
                <button type="button" onClick={handleShowPassword}>
                  <FaRegEyeSlash />
                </button>
              </div>
            </div>
          </div>
        )}
        </div>

        <button
          type="submit"
          className="ml-3 p-2 mt-3 transition ease-in-out delay-150 duration-300 w-48 shadow-lg bg-blue-300 rounded hover:scale-103 hover:translate-y-1 hover:bg-indigo-500"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
