import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-6 my-1 ">
      <div className='shadow '>
        <div className=''>
          <Link to="/about">About</Link>
        </div>

        <div className=''>
          <Link to="/contact">Contact</Link>
        </div>

        <div className=''>
          <Link to="/privacy">Privacy</Link>
        </div>

        <div className=''>
          <Link to="/terms">Terms of Services</Link>
        </div>
      </div>
      <h1 className='bg-indigo-50'> copyright 2023. All Rights reserved </h1>
    </footer>
  );
}

export default Footer
