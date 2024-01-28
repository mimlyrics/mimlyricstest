import {useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest-api.onrender.com";
import ScrollToBottom from "react-scroll-to-bottom";
import TimeAgo from "timeago-react";
import Message from "./Message";
import { FaX } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const RecentMessages = ({files, conversationId, room, image, userId, message,  messages, phone}) => {
  const [recentMessages, setRecentMessages] = useState([]);
  var {phone} = useSelector(state => state.auth.userInfo);
  const [timeAgo, setTimeAgo] = useState("");
  const [go, setGo] = useState(false);
  const [mediaArray, setMediaArray] = useState([]);
  

  useEffect(() => {
    const getMessages = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/message/${room}/${phone}`, {headers: {withCredentials: true}});
            //console.log("HEYYYYYYY: ", res.data.messages);
            setRecentMessages(res.data.messages);
            /*let media = [];
            recentMessages.map( r => {
                media.push(r.media);
            })
            console.log(media);
            setMediaArray(media);
            let mediax = media;
            mediax.map((m,i) => {
                m.map((x,i)=> {
                    console.log(x);
                });
                console.log(i);
            })   
            setTimeAgo(res.data.messages[0].updatedAt);*/
        }catch(err) {
            console.log(err);
        }
    }
    getMessages();
   }, [conversationId, files]);

   const deleteMsg = async (messageId) => {   
    await axios.delete(`${BASE_URL}/message/${messageId}`, {headers: {withCredentials: true}});
    setRecentMessages(recentMessages.filter(recentMessage => recentMessage._id !== messageId));  
   }

   console.log(mediaArray);

  return (
    <section className=" h-[100vh] overflow-scroll bg-slate-50 p-1 rounded-md mb-1 md:w-[50%] lg:w-[55%] ">
        { recentMessages ?    
            <div className=" ">
                <ScrollToBottom>
                {recentMessages.map(recentMessage => {             
                    return (<div className={recentMessage.from == phone ?  
                        "ml-14 w-[98%] p-1 rounded-md mb-1 text-blue-950 bg-red-300": 
                        " w-[98%] p-1 rounded-md mb-1 text-blue-950 bg-violet-200" } 
                        key={recentMessage._id}>
                    
                        <div className=" font-medium rounded-full bg-slate-100">
                            <h1 className="ml-3">{recentMessage.username}</h1> 
                        </div>
                        <div className="relative flex my-1">  
                            {recentMessage.avatar ? <img className="w-9 h-9 md:w-11 md:h-11 rounded-full" src={recentMessage.avatar}/> : null}
                            <p className="ml-3 md:text-lg">{recentMessage.text}</p>
                            {recentMessage.from === phone ? <FaX onClick={()=>deleteMsg(recentMessage._id)} className=" absolute w-4 h-4 left-80 text-red-400 hover:text-red-600 "/>: null}
                        </div>    
                        
                        {
                            recentMessage.media.length > 0 ?
                            <div className={ recentMessage.media.length > 1 ? 
                                ` h-[30vh] overflow-scroll grid grid-cols-2 lg:grid-cols-2 gap-2 mx-2`: 
                                `  mx-11 `    
                            }>  
                            {recentMessage.media.map( m => {
                                return ( <div key={m._id} className=" flex ">
                                    <div className=" my-1 border-b-2 ">
                                        {m.mimetype.split("/")[0] === "video" && <video controls className="" src={m.path}/>}
                                        {m.mimetype.split("/")[0] === "image" && <img className="" src={m.path}/>}
                                        {m.mimetype.split("/")[0] === "audio" && <audio controls className="" src={m.path}/>}
                                    </div>
                                    </div>
                                )                 
                            }) }</div> : null   
                        }

                        <div>
                            {timeAgo !== <TimeAgo datetime={recentMessage.updatedAt}/> ? 
                            <p className=" ml-80 px-2 bg-indigo-100 text-indigo-600 rounded-md">
                            <TimeAgo datetime={recentMessage.updatedAt}/></p> : null}      
                        </div>
                    </div>                      
                    )                    
                })}
                <div>

                {messages ? messages.map(message => {
                    return <Message image={image} userId={userId} key={message} phone={phone} message={message}/>
                }): null}
                 </div>
                 </ScrollToBottom>
            </div>  : null
            }
    </section>
  )
}

export default RecentMessages
