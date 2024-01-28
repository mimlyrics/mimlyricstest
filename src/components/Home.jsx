import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import mimletraslogo from "../assets/mimlyricspng/mimchart1.png";
import mimletraslogo1 from "../assets/mimlyricspng/mimletras.png";
import WebFont from "webfontloader"
import "./css/index.css";
import { FaExclamation, FaFacebook, FaSnapchat, FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
const Home = () => {

useEffect(() => {
   WebFont.load({
     google: {
       families: ['Droid Sans', 'Chilanka']
     }
   });
  }, []);

  return ( 
    <section className={` font-medium space-x-1 bg-gradient-to-r from-slate-100 to-violet-200 mx-1 mt-1 lg:mx-3 md:ml-48 lg:ml-64 `}>
      <div className={` bg-[url("../assets/mimlyricspng/mimletras.png")]`}>
        {/*<img className=' invisible md:visible ' src={mimletraslogo} alt="mimletra"/>
  <img className='absolute top-0 h-full w-full opacity-25 md:hidden' src={mimletraslogo1} alt="mimletras"/>*/}
      </div>
      <div className=' pl-2 pr-20 md:pr-28 py-2'>
        <p className="text-gray-900 ">
          Welcome to mimlyrics ! a web app where you can watch and get lyrics video in four languages (english, french, spanish, german)
           for entertainment or post .
        </p>
      </div>

      <p className=" pl-2 pr-20 md:pr-28 font-loader py-2">
        This web app is subdivided into categories (mimlyrics francais, mimlyrics, mimletras, mimlyrics Deutsch) etc to allow 
        User find content that suit them the most .
      </p>
  
      <div className="flex flex-col md:text-lg py-2 ">
        <div className="flex flex-col mx-2 mb-3">
          <p className=''> _______</p>
          <Link to="/video/category" className="">
            Get videos to post
          </Link>
          <Link to="/post/lyric/category" className="text-lg">
          Lyrics
          </Link>
          <Link to="/infochat" className="">
            Chat
          </Link>
          <Link className="text-gray-700" to="/admin/dashboard" >Admin DashBoard</Link>
          <Link to="/post/editor/dashboard">Editor Dashboard</Link>
        </div>

        <div className=" bg-gradient-to-l from-violet-200 to-violet-50 md:flex md:space-x-28">
          <div className="flex flex-col mb-3 py-2">
            <p>About Us</p>
            <Link to="/location" className="ml-3">
              Location
            </Link>
            <Link to="/why" className="ml-3">
              Why ?
            </Link>

            <div className=" my-5 ">
              <Link to="/">Contact</Link>
              <div className="flex">
                <FaWhatsapp className=" w-5 h-5 md:w-7 md:h-7 "/>+237 6245401
              </div>
              <div className="flex">
                <FaExclamation className=" w-5 h-5 md:w-7 md:h-7"/> Geographic Location
              </div>
            </div>
          </div>
          
          <div className="flex flex-col mx-3 mb-3">
            <p className="text-lg">Follow Us on</p>
            <div className="flex space-x-2 py-1">
              <FaYoutube className="w-6 h-6 md:w-7 md:h-7 text-red-600"/>
              <Link to="/youtube" >Youtube</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-blue-600"/>
              <Link to="/facebook">Facebook</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-purple-800"/>
              <Link to="/instagram">Instagram</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaTiktok className="w-6 h-6 md:w-7 md:h-7 text-gray-800"/>
              <Link to="/tiktok">Tiktok</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaTwitter className="w-6 h-6 md:w-7 md:h-7 text-blue-500"/>
              <Link to="/twitter">Twitter</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaGithub className="w-6 h-6 md:w-7 md:h-7"/>
              <Link>Github</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home