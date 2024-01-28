import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
//const BASE_URL = "http://localhost:5000/api/v1"
const BASE_URL = "https://mimlyricstest-api.onrender.com";
import axios from "axios";
const LyricCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(`${BASE_URL}/room`, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, []);

  return (
    <section className="absolute top-24 md:top-0 md:w-[50%] md:ml-[27%] my-2 py-3">
      <div className="text-center">
        <h1>__GET LYRICS___**</h1>
      </div>
      {/** Get videos to post */}
        <div className=" text-center flex flex-col ">
          <label htmlFor='category'>Category</label>
          <select className=" mb-9 mx-3 h-16 text-lg " value={category} onChange={e=>setCategory(e.target.value)}
          >
            {categories ? categories.map(categoryx => {
              return (<option className=" rounded-full shadow bg-zinc-300 h-20 "  key={categoryx._id} value={categoryx.name}>{categoryx.name}</option>)
            }) : null}
          </select>
        </div>
        <Link onClick={ e=>(!category) ? e.preventDefault() : null} 
          to={`/post/lyric?categoryx=${category}`} 
          className=" w-32 h-11 p-4 mx-3 md:ml-38 rounded:md shadow text-center bg-indigo-300 hover:bg-indigo-500 hover:translate-y-1" >Confirm</Link>
    </section>
  )
}
export default LyricCategory
