import axios from 'axios';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { BsEye, BsViewStacked } from 'react-icons/bs';
import { FaUnderline } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa6';
import { FaBold } from 'react-icons/fa6';
import { FaSearchengin } from 'react-icons/fa6';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
//const BASE_URL = "http://localhost:5000/api/v1";
import { useMimlyrics } from '../context/AppProvider';
const BASE_URL = "https://mimlyricstest2-api.onrender.com";
import { useSelector } from 'react-redux';
const LyricRead = () => {
  const [searchLyrics, setSearchLyrics] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [errMsg, setErrMsg] = useState("");   
  const [sLyrics, setSLyrics] = useState([]);
  const [lyric, setLyric] = useState({});
  const [id, setId] = useState("");
  const [text, setText] = useState([]);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [likes, setLikes] = useState("");
  const {_id} = useSelector(state => state.auth.userInfo);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(0);
  const {isActiveModalNavbar} = useMimlyrics();
  console.log(location.search);
  useEffect(() => {
    const {lyricId} = queryString.parse(location.search);
    setId(lyricId);
  }, [id])

  useEffect(() => {
    const getLyric = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/lyric/get/${id}`, {headers: {withCredentials: true}});
        setLyric((prevState) => {
          return {prevState, ...res.data.lyric}
        });
       setText(lyric.lyric.split("\r\n"));
       setLikes(lyric.likes.length);
       setViews(lyric.views);
       const checkLike = lyric.likes.includes(_id);
       setHasLiked(checkLike);
       console.log(lyric);
      }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.data?.message);
      }
    }
    getLyric();
  }, [id, hasLiked])

  console.log(lyric);
  const searchLyricsF = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/lyric/search/${searchId}`, 
          {headers: {withCredentials: true}});
        setSearchLyrics(res.data.searchlyrics);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
   }

   useEffect(() => {
    const similarLyrics = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/upload/lyric/get/${id}`,
             {headers: {withCredentials: true}});
            setSLyrics(res.data.searchlyrics);        
            console.log(res.data);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    }, [id])

    useEffect(() => {
      setTimeout(() => {
      const lyricViews = async () => {
        try {
          const res = await axios.put(`${BASE_URL}/lyric/views/${id}`, 
            { headers: {"Content-Type": "application/json"}});
          console.log(res.data);
          setViews(res.data.lyric.views);   
        }catch(err) {
          setErrMsg(err?.data?.message);      
        }
      }
      lyricViews();
      }, [10000])
    }, [id])

  const likeLyricFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/lyric/likes/${id}`, {userId: _id}, 
        { headers: {"Content-Type": "application/json"}});
      console.log(res.data);
      setLikes(res.data.lyric.likes.length);   
      const checkLike = res.data.lyric.likes.include(_id);
      setHasLiked(checkLike);
    }catch(err) {
      setErrMsg(err?.data?.message);      
    }
  }

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60" : "md:absolute md:top-16 md:ml-[20%] mx-1 md:mx-3"}>
      <div className=' my-2 md:my-20 '>
        <div className=' mx-3 flex space-x-8 items-center'>
          {lyric.photo ? <img className=' w-[35vw] md:w-[10vw] 
            ring-2 ring-fuchsia-900' src={lyric.photo} alt='x'/>: null}
          <div className='flex flex-col space-y-2'>
            <div className=' text-center ring-2 bg-fuchsia-50 ring-fuchsia-900'>
            {lyric.title?  <p className=' p-1 '>{lyric.title}</p>: null}
            </div>
            <div className='flex space-x-6 '>
              <FaUnderline onClick={() => setIsUnderlined(!isUnderlined)} className = { isUnderlined ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg` }/>
              <FaItalic onClick={() => setIsItalic(!isItalic)} className = { isItalic ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg`}/>
              <FaBold onClick={() => setIsBold(!isBold)} className = { isBold ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg`}/>
            </div>
            <div className='flex space-x-6'>
              <div className=''>
                <FaThumbsUp onClick={(e) => likeLyricFunc(e)} className={ hasLiked ? ' cursor-pointer text-gray-900 w-6 h-6 md:w-7 md:h-7' :
                 'cursor-pointer text-gray-200 w-6 h-6 md:w-7 md:h-7'}/>
                { lyric.likes ? <h1>{likes}</h1> : <h1>0</h1> }
              </div>
              <div className=''>
                <BsEye className='text-gray-700 w-6 h-6 md:w-7 md:h-7'/>
                { lyric.views ? <h1>{lyric.views} </h1> : <h1>0</h1>}
              </div>
            </div>
          </div>
        </div>
        <div>
          <audio src={lyric.path} controls className=' w-[70%] my-3' /> 
        </div>
        <div className=' bg-slate-100 text-gray-950 '>
          {text.map(t=> {
            return <div 
                className={ isUnderlined && isItalic && isBold ? ' mx-3 underline italic font-semibold': null ||
                isUnderlined && isItalic ? ' mx-3 underline italic': null  ||
                isUnderlined && isBold ? ' mx-3 underline font-semibold': null || 
                isItalic && isBold ? ' mx-3 italic font-semibold ': null ||
                isUnderlined ? ' mx-3 underline' : null || 
                isBold ? ' mx-3 font-semibold' : null ||
                isItalic ? ' mx-3 italic' : null || ' mx-3'}  key={t.i} 
                >
                <p className='py-2 -my-2 md:w-[40vw]'>{t}</p>       
            </div>
          })}
          
        </div>
        <div className=' p-4 text-gray-950 '>
          <p className='mb-2 font-medium '>Description:</p>
          <p className='md:w-[40vw]'>{lyric.description}</p>       
        </div>
      </div>
    
      <div className='text-blue-950 text-lg'>
        <h1>Recommendation</h1>                  
        {sLyrics ? sLyrics.map(lyricx => {
            return (
                <div key={lyricx._id}>
                    <div>
                        <p>{lyricx.artistName}</p>
                        <p>{lyricx.title}</p>
                    </div>
                </div>
            )
        }) : null}
      </div>
    </section>
  )
}

export default LyricRead
