import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Appstate } from '../App';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate=useNavigate();
    const useAppstate=useContext(Appstate);
    const loginOut=()=>{
        useAppstate.setLogin(false);
        navigate('/login');
    }
return (
    <div className="sticky header flex justify-between top-0 z-10 bg-color home cursor-pointer text-4xl font-bold p-3 text-center">
        <Link to={'/'}><div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="FilmyVerse logo" className="h-20 w-56" />
        {/* <span className="header-heading">FilmyVerse</span> */}
        </div></Link>
        {useAppstate.login?
        <div className="flex">
        <Link to={'/addmovie'}><button className="mx-auto btn-Header  text-white mt-3 mr-4  border-0 px-8 py-3 focus:outline-none rounded text-2xl block"><span className="text-white font-medium pt-3 text-lg">Add New</span><AddIcon/></button></Link><button onClick={loginOut} className="pb-2 pr-2 pl-2 mt-[0.7rem] btn-Header rounded"><LogoutRoundedIcon/></button></div>:
        <Link to={'/login'}><button className="mx-auto btn-Header text-white mt-3  border-0 py-2 px-8 focus:outline-none rounded text-lg block"><span className="text-white font-medium pt-3 text-lg">Login</span></button></Link>
        }
    </div>  
)
}

export default Header;