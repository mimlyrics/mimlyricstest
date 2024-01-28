import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import EditorPost from "./EditorPost";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest-api.onrender.com";
import axios from "axios";
const Post = () => {
  const [rooms, setRooms] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    const getRooms = axios.get(`${BASE_URL}/room`).then(res=> {
      setRooms(res.data.rooms);
    }).catch(err=> setErrMsg(err?.data?.message));
    
  }, [])
  return (
    <>
    <section className="cursor-pointer md:visible mx-1">
        <div className=" md:hidden mx-3 text-lg bg-indigo-100 text-blue-900 flex justify-around my-2">
          <Link to="/post/lyric">Post lyrics</Link>
          <Link to="/post/video/category">Post lyrics Video </Link>
        </div>
        <div className=" hidden md:visible bg-slate-300 text-center py-3 ">
            <h1 className="text-blue-950"> Lyrics </h1>
        </div>
        {rooms.map(room => {
            return ( <Link 
                     onClick={e => !room.name ? e.preventDefault() : null} 
                     to={`/post/video/roomName=${room.name}`}
                     className=" md:ml-[78%] md:w-[23%] hidden md:visible md:bg-zinc-100 md:flex md:shadow md:my-3 md:hover:bg-zinc-300 "
                     key={room._id}>
                   <h1  className="mt-4 mr-7 font-medium text-lg text-blue-500 cursor-pointer">{room.name}</h1>
                   {room.logo ? <img className=" mb-2 w-16 h-16 rounded-full" alt="X" src={room.logo}/> : null }
                  </Link> )
        })}  
        <Outlet/>      
    </section>
    </>
  )
}

export default Post
