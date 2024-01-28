import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux"
import {Link,useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/auth/authSlice";
import { FaRegEyeSlash, FaRegEye, FaUpload } from "react-icons/fa6";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
const FIRSTNAME_REGEX = /^[a-zA-Z0-9]+$/;
const LASTNAME_REGEX = /^[a-zA-Z0-9]+$/;
const PASSWORD_REGEX =  /^[A-Za-z]\w{7,14}$/;
const EMAIL_RGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
/*const FIRSTNAME_ERR_MSG = 
const LASTNAME_ERR_MSG = Last name. must start with a letter. No(~!@#$%^&*(_+){}\"'.,:;/?)
const EMAIL_ERR_MSG = invalid email. example: example@gmail.com 
const PASSWORD_ERR_MSG = password. atleast(one lowercase, uppercase letter, digit)
const MOBILENO_ERR_MSG = mobile number. must be 9 digits */
import { useUpdateUserMutation } from "../slices/auth/usersApiSlice";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/v1";
const Profile = () => {
  var [firstNamex, setFirstNamex] = useState("");
  var [lastNamex, setLastNamex] = useState("");
  var {firstName, _id, lastName} = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    setFirstNamex(firstName);
    setLastNamex(lastName);
  }, [firstName, lastName])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [updateProfile, {isLoading}] = useUpdateUserMutation();
  // validating useState
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSucess] = useState(false);
  //const usernameRef = useRef(false);
  const [firstNameFocus, SetFirstNameFocus] = useState(false);
  useEffect(() => {
    const result = FIRSTNAME_REGEX.test(firstNamex);
    console.log(result);
    setValidFirstName(result);
  }, [firstNamex]);

  useEffect(() => {
    const result = LASTNAME_REGEX.test(lastNamex);
    console.log(result);
    setValidLastName(result);
  }, [lastNamex]);

  console.log(firstNamex, lastNamex);
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({firstName: firstNamex, lastName:lastNamex}).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/");
    }catch(err) {
      setErrMsg(err?.data?.message);
      setTimeout(() => {
        setErrMsg(false);
      }, [4000])
    }
  }

  useEffect(() => {
    async function getImage() {
      try {
        if(_id) {
          console.log("yess");
          const res = await axios.get(`${BASE_URL}/upload/avatar/${_id}`, 
          {headers: {withCredentials: true}});
          console.log(res.data);
          setImage(res.data.user.avatar);
        }
      }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.data?.message);
      }
    }
    getImage();
  }, [_id])

  const updateProfileImage = async (e) => {
    try {
      e.preventDefault();  
      const userId = _id; 
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);
      const postPic = await axios.put(`${BASE_URL}/upload/avatar/${userId}`, formData, 
        {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}});
      console.log(postPic);
    }catch(err) {
      setErrMsg(err)
      console.log(err);
    }
  }


  return (
    <section className=" h-11 mt-11">
      <form
        className=" md:w-6/12 md:ml-64 bg-white ml-4 flex-col text-lg"
      >
        <h2 className="mx-5 mt-2 mb-3 italic text-2xl">
            Update Account
        </h2>

        {errMsg ? <p className="animate animate-bounce text-red-500 md:text-lg">{errMsg}</p> : null}
        {success ? <p className="text-green-300 md:text-lg">{success}</p> : null}

        <div className="relative mb-3 mx-4 cursor-pointer">
            <img className="w-24 h-24 rounded-full" src={image} alt="X"/>
            <label className="absolute top-20 left-16 cursor-pointer " htmlFor="picture"><FaUpload onClick={(e)=>updateProfileImage(e)} className=" w-5 h-5 text-blue-200 hover:text-blue-800"/></label>
            <input id="picture" type="file" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} hidden/>
        </div>
        <div className="">
          <div className="form-group p-2 ">
            <label className="flex" htmlFor="firstName">
              First Name 
            </label>
            <input
              type="text"
              autoComplete="off"
              value={firstNamex}
              required
              onChange={(e) => setFirstNamex(e.target.value)}
              className=" px-2 border w-[70%] rounded md:w-[50%] lg:w-[55%] mr-5 h-8 text-blue-600"
            />
          </div>

          <div className=" p-2 ">
            <label className="flex" htmlFor="lastName">Last Name
            </label>
            <input
              type="text"
              autoComplete="off"
              value={lastNamex}
              onChange={(e) => setLastNamex(e.target.value)}
              className="border p-2 w-[70%] rounded mr-5  md:w-[50%] lg:w-[55%]  h-8 text-blue-600"
            />
          </div>

        </div>

        <div className="p-2">
          <button
            onClick={handleProfileUpdate}
            type="submit"
            className=" mt-2 p-1 mb-2 transition ease-in-out delay-150 duration-300 w-48 shadow-lg bg-blue-300 rounded hover:scale-103 hover:translate-y-1 hover:bg-indigo-500"
          >
            Update Account
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile
