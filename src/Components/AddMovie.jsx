import React, { useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { moviesRefe } from '../Firebase/Firebase';
import { Appstate } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
const AddMovie = () => {
    const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1024px)'
    });
    const inputRef = useRef(null);

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    setForm({ ...form, movieUrl: reader.result });
    };
};

    const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1024px)'
    });
    const useAppstate=useContext(Appstate);
    const navigate=useNavigate();
    const[form,setForm]=useState({
        name:"",
        year:"",
        movieUrl:"",
        description:"",
        rating:0,
        rated:0
    });
    const [loading,setLoading]=useState(false);
    const addMovie= async (event)=>{
        event.preventDefault();
        if(useAppstate.login){
        try{
            setLoading(true);
        await addDoc(moviesRefe,form);
        swal({
            title:"Successfully Added",
            icon:"success",
            button: false,
            timer:2000
        })
        setLoading(false);
        }
        catch(error){
            swal({
                title:error,
                icon:"error",
                button: false,
                timer:3000
            });
        }
    }else{
        navigate('/login');
    }
        setForm({
            name:"",
            year:"",
            movieUrl:"",
            description:"",
            rated:0,
            rating:0
        });
    }
    const handleSearchPoster = () => {
    const movieName = prompt("Enter movie name to search:");
    if (movieName) {
        const searchUrl = `https://www.google.com/search?q=${movieName}&tbm=isch`;
        window.open(searchUrl);
    }
}

return (
    <>
    {isDesktopOrLaptop && (
        <div className="desktop-device">
        <div className="flex justify-center">
    <div className="font-bold max-h-auto pt-10 w-4/5  min-h-screen">
    <h1 className="text-center text-4xl mb-5 form-heading font-semibold my-1 login-title">MOVIE INFO FORM</h1>
        <form className="mx-auto lg:w-1/2 md:w-2/3" onSubmit={addMovie}>
<div className="flex flex-wrap -m-2">
    <div className="p-2 w-full my-1 login1-input ">
    <label  className="leading-7 text-sm  form-heading"></label>
    <input type={'text'} id="name" placeholder='Enter Your Favourite Movie Name......'  name="name" required={true} value={form.name} onChange={(e)=>setForm({...form,name: e.target.value})}
    className="w-full bg-color bg-opacity-50 rounded home text-base outline-none text-white new-border py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login2-input">
    <label  className="leading-7 text-sm  form-heading"></label>
    <input type={'number'} id="year" name="year" placeholder='Enter Movie Release Year.....' required={true} value={form.year} onChange={(e)=>setForm({...form,year: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login1-input">
    <label  className="leading-7 text-sm  form-heading"></label>
    <div className="flex">
    <input type={'text'} id="image" placeholder='Enter Movie Image Url.....' name="image" required={true} value={form.movieUrl} onChange={(e)=>setForm({...form,movieUrl: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out order-1"
    />
    <button onClick={handleSearchPoster} className="ml-2 px-3 py-1 rounded-md btn-Header text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 order-2">
            GOOGLE
        </button>
        </div>
    </div>
    <div className="p-2 w-full my-1 login2-input">
        <label  className="leading-7 text-sm text-white"></label>
        <textarea type={'text'} rows="4" cols="50" id="description" placeholder='Enter Movie Description......' name="description" required={true} value={form.description} onChange={(e)=>setForm({...form,description: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login-button">
        <button type={'submit'} className="flex mx-auto text-white mt-3 btn-Header border-0 py-2 px-8 focus:outline-none  rounded text-lg">
        {loading? <TailSpin height={30} color='white'/>:"SUBMIT"}
        </button>
    </div>
    </div>
</form>
    </div>
    </div>
        </div>
    )}
    {isTabletOrMobile && (
        <div className="mobile-device">
        <div className="flex justify-center">
    <div className="font-bold max-h-auto pt-10 w-4/5  min-h-screen">
    <h1 className="text-center text-4xl mb-5 form-heading font-semibold my-1 login-title">MOVIE INFO FORM</h1>
        <form className="mx-auto lg:w-1/2 md:w-2/3" onSubmit={addMovie}>
<div className="flex flex-wrap -m-2">
    <div className="p-2 w-full my-1 login1-input ">
    <label  className="leading-7 text-sm  form-heading"></label>
    <input type={'text'} id="name" placeholder='Enter Your Favourite Movie Name......'  name="name" required={true} value={form.name} onChange={(e)=>setForm({...form,name: e.target.value})}
    className="w-full bg-color bg-opacity-50 rounded home text-base outline-none text-white new-border py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login2-input">
    <label  className="leading-7 text-sm  form-heading"></label>
    <input type={'number'} id="year" name="year" placeholder='Enter Movie Release Year.....' required={true} value={form.year} onChange={(e)=>setForm({...form,year: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login1-input">
    <label  className="leading-7 text-sm  form-heading"></label>
    <div className="flex items-center justify-center">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={inputRef} />
        <div className="flex flex-col items-center">
        {form.movieUrl && (
            <img src={form.movieUrl} alt="Movie Poster" className="cardImg" />
        )}
        <div className="flex flex-row justify-between">
        <button onClick={() => inputRef.current.click()} className="text-white btn-Header animate-pulse rounded-md py-2 px-3 w-4/5 mr-2">
            UPLOAD MOVIE IMAGE 
        </button>
        <button onClick={handleSearchPoster} className="ml-2 px-3 py-1 rounded-md btn-Header text-white hover:bg-gray-700 focus:outline-none animate-pulse focus:ring-2  focus:ring-gray-400 focus:ring-opacity-75 order-2">
            GOOGLE
        </button>
        </div>
        </div>
    </div>
    </div>
    <div className="p-2 w-full my-1 login2-input">
        <label  className="leading-7 text-sm text-white"></label>
        <textarea type={'text'} rows="4" cols="50" id="description" placeholder='Enter Movie Description......' name="description" required={true} value={form.description} onChange={(e)=>setForm({...form,description: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="p-2 w-full my-1 login-button">
        <button type={'submit'} className="flex mx-auto text-white mt-3 btn-Header border-0 py-2 px-8 focus:outline-none  rounded text-lg">
        {loading? <TailSpin height={30} color='white'/>:"SUBMIT"}
        </button>
    </div>
    </div>
</form>
    </div>
    </div>
        </div>
    )}
    </>
)
}

export default AddMovie;