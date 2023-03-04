import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactStars from 'react-stars';
import {getDocs,doc,deleteDoc} from 'firebase/firestore';
import { moviesRefe } from '../Firebase/Firebase';
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Cards = () => {
    const navigate=useNavigate();
    const useAppstate=useContext(Appstate);
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState(false);
    const[removeState,setRemoveState]=useState(false);
    useEffect(()=>{
        async function getData(){
            setLoading(true);
        const _data=await getDocs(moviesRefe);
        _data.forEach((docs)=>{
            setData((prv)=>[...prv,{...docs.data(),id:docs.id}]);
        });
        setLoading(false);
        }
        getData();
        admin();
    },[]);
    const removeCard=async(movieId)=>{
        const movieref=doc(moviesRefe,movieId);
        await deleteDoc(movieref);
        setData((prv)=>prv.filter((docs)=>docs.id!==movieId));
    }
    const admin=()=>{
        if("Kazmi.."===useAppstate.userName){
            setRemoveState(true);
        }else{
            setRemoveState(false);
        }
    }
return (
    <div className='flex flex-wrap justify-around h-auto'>
    {loading?<div className="flex justify-center  center items-center"><MutatingDots height={80} color="red" secondaryColor='white'/></div>:
        data.map((e,i)=>{
            const n=e;
            return(
        <div key={i} className="m-5 ml-2 relative flex flex-col justify-between mr-2 bg font-bold home shadow-lg cursor-pointer cardHeight w-60">
        <Link to={`detial/${e.id}`}><div className="
            w-full p-2 image-container"><img src={e.movieUrl} alt="" className="h-72 w-full object-cover object-top"/></div>
            <div className="px-2 pt-2"><p className="break-words"><span className="text-gray-400">Name:</span> {e.name}</p>
            <p className="flex items-center"><span className="text-gray-400 mr-2">Rating:</span> 
            <ReactStars
                size={20}
                value={e.rating>0?e.rating/e.rated:0}
                half={true}
                edit={false}
                />
            </p>
            <p><span className="text-gray-400">Year:</span> {e.year}</p></div></Link>
            {removeState?
        <button 
        onClick={()=>removeCard(e.id)} className="p-2 bg-red-500 text-white w-full cardbtn">REMOVE
        </button>:<button 
        onClick={()=>navigate(`detial/${e.id}`)} className="p-2 bg-red-500 text-white w-full cardbtn">REVIEW NOW
        </button>
            }
        </div>
            );
    })}
    </div>
)
}

export default Cards;
