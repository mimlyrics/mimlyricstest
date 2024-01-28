import { useState, useEffect } from "react";
import {FaLanguage, FaList} from "react-icons/fa6";
import { FaAlignJustify } from "react-icons/fa6";
import {FaX} from "react-icons/fa6"
import { FaUser } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { IoIosHelp, IoMdAlbums, IoMdHelp, IoMdSettings } from "react-icons/io";
import mimlogo from "../assets/graymimlogo.png";
import { Outlet } from "react-router-dom";
import axios from "axios";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest-api.onrender.com";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const {userInfo} = useSelector(state => state.auth);
  
  const [logOutApiCall, {isLoading}] = useLogoutMutation();

  useEffect(() => {
    async function getImage() {
      if(userInfo) {
        const userId = userInfo._id;
        const res = await axios.get(`${BASE_URL}/upload/avatar/${userId}`, 
          {headers: {withCredentials: true}});
        //console.log("resss ", res.data.user.avatar);
        setImage(res.data.user.avatar);
      }
    }
    getImage();
  }, [image, file]) 

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOutApiCall().unwrap();
      dispatch(logout());      
      navigate("/");
    }catch(err) {
      //console.log("huumm");
      console.log(err?.data?.message);
    }
  }

  const handleProfile = async (e) => {
    try {
      e.preventDefault();  
      const userId = userInfo._id; 
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);
      const postPic = await axios.put(`${BASE_URL}/upload/avatar/${userId}`, formData, {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}});
      setImage(postPic.data.user.profilePhoto);
      console.log(postPic);
    }catch(err) {
      console.log(err);
    }
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  }

   return (    
      <>
       <nav className="bg-zinc-300 h-16 relative md:flex-row md:justify-between">
         <div className="navbar-logo">
           <img src="" alt="" />
         </div>
         {showModal ? (
           <div className=" absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => setShowModal(false)}>
               <FaX />
             </button>
           </div>
         ) : (
           <div className="absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => setShowModal(true)}>
               <FaAlignJustify />
             </button>
           </div>
         )}
            
         <div className=" invisible md:visible">
           <ul className=" mx-1 mt-1 px-3 absolute top-16 w-44 md:w-[19%] lg:w-[19%] flex-col lg:text-lg bg-zinc-100 shadow-lg shadow-zinc-500">              
             <Link className="flex py-2 hover:bg-slate-200 " to="/">
               <FaHouse className=" ml-2 mr-3  "/>Home
             </Link> <p className=""></p>

             <Link className="flex py-2 hover:bg-slate-200" to="/infochat">
              <FaMessage className=" ml-2 mr-3 "/>Let's Chat
           </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/post/lyric/category">
               <FaMusic className=" ml-2 mr-3  "/>Lyrics
             </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/video/category">
               <FaVideo className=" ml-2 mr-3 "/>Lyrics video
             </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/assistance">
               <IoMdHelp className="ml-2 mr-3"/> Assistance
             </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/settings">
                <IoMdSettings className="ml-2 mr-3"/> Settings
             </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/help">
              <FaExclamation className="  "/> Help
             </Link><span className="border-b-2"></span>

             <Link className="flex py-2 hover:bg-slate-200" to="/language">
             <FaLanguage className="w-5 h-5"/>Language</Link>
             <span className="border-b-2"></span>
           </ul>          
         </div>

         {isLoading ? <h1 className="h-36 border">LOADING</h1> : null}

         {userInfo ? null:          
          <div className="absolute top-5 left-56">
           <Link to="/register">Sign Up</Link>
         </div>
         }
         <div className="absolute top-5 left-72">
           <Link to="/language" className="mr-2">Language</Link>
         </div>

        {showProfile ? 
          <div className=" absolute top-5 right-11 " onClick={handleShowProfile}>
            <FaUser className=" h-6 w-6 md:h-7 md:w-11 "/>
          </div> 
          : 
          <div className=" py-5 ">
        {userInfo ?  <div className="">
          <FaUser className=" absolute top-5 right-11  w-6 h-6 md:h-7 md:w-11 " onClick={handleShowProfile}/>
          
         <div  
           className=" absolute top-16 right-2 cursor-pointer bg-slate-100"
          >
          <div className="py-1 mx-2 ">
            
            {image ? 
              <div className="font-medium text-center my-3 text-xl">
                <img src={image} alt={userInfo.firstName.substring(0,1)}
                 className="rounded-full mt-1 mb-3 w-32 "/>
                <p className="text-blue-900 ">{userInfo.firstName}</p>
              </div> : 
              <div className="">
                <div className="mb-2 flex flex-col">
                <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
                <button onClick={handleProfile} className="shadow rounded w-20 h-7 p-1 bg-blue-300"><p className="text-large">
                Save Pic
                </p></button>
              </div>  
            </div>}
        
            <div>
              <button className=" mx-3 shadow rounded w-24 h-7 p-1 mb-2 bg-green-300"><Link to="/profile" className="text-large text-center">
                Update Info
              </Link></button>
            </div>

            <div onClick={handleLogout}>
              <button className="mx-3 shadow rounded w-24 h-7 p-1 bg-red-300"><Link to="/logout" className="text-large text-center">
                Logout
              </Link></button>
            </div>
          </div> 
         
         </div>
        </div> : null}
          </div>}         
       </nav>

       <section className="md:hidden ">
         {/** Hero section */}
         {showModal ? (
           <ul onClick={() => setShowModal(false)} className="absolute  h-screen text-white flex w-80 flex-col shadow  bg-zinc-600">
            
            <div className=" mt-2 bg-zinc-600 hover:bg-slate-700">
             <Link className=" ml-20 " to="/">
               <FaHouse className="absolute left-14 "/>Home
             </Link> 
             <p className=" py-1 border-b-2"></p>
            </div>

            <div className=" mt-2 bg-zinc-600 hover:bg-slate-700">
             <Link className="ml-20 " to="/infochat">
              <FaMessage className="absolute left-14  "/>Let's Chat
             </Link><span className="border-b-2"></span>
             <p className="py-1 border-b-2"></p>
           </div>
 
             <Link className="ml-20 bg-zinc-600 py-3 " to="/post/lyric/category">
               <FaMusic className="absolute left-14  "/>Lyrics
             </Link><span className="border-b-2"></span>

             <Link className="ml-20 bg-zinc-600 py-3 " to="/video/category">
               <FaVideo className="absolute left-14 "/>Lyrics video
             </Link><span className="border-b-2"></span>

             <Link className="ml-20 bg-zinc-600 py-3 " to="/assistance">
               <IoMdHelp className="absolute left-14"/> Assistance
             </Link><span className="border-b-2"></span>

             <Link className="ml-20 bg-zinc-600 py-3" to="/settings">
               <IoMdSettings className="absolute left-14"/> Settings
             </Link><span className="border-b-2"></span>

             <Link className="ml-20 bg-zinc-600 py-3" to="/help">
              <FaExclamation className="absolute left-14  "/> Help
             </Link><span className="border-b-2"></span>

             <Link to="/language" className=" ml-20 bg-zinc-600 py-3">
             <FaLanguage className=" absolute left-14"/>Language</Link>
             <span className="border-b-2"></span>
           </ul>
          
         ) : null}
        </section>
        <Outlet/>
      </>    
   );
}

export default Navbar
