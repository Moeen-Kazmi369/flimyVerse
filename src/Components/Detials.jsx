import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import {doc} from 'firebase/firestore';
import {getDoc} from 'firebase/firestore';
import { LineWave } from 'react-loader-spinner';
import Reviews from './Reviews';
const Detials = () => {
    const {id}=useParams();
    const[detialLoading,setdetialLoading]=useState(false);
    const[data,setData]=useState({
        name:"",
        year:"",
        description:"",
        movieUrl:"",
        rating:0,
        rated:0
    });
    useEffect(()=>{
        setdetialLoading(true);
        async function getData(){
        const _doc=doc(db,"movies",id);
        const _data= await getDoc(_doc);
        setData(_data.data());
        setdetialLoading(false);
        }
        getData();
    },[])
return (
    <>
    {detialLoading ?<div className="flex justify-center  center items-center"><LineWave height={150} width={150} color="red" firstLineColor='red' middleLineColor='white' lastLineColor='red'/></div>:
    <div className="flex card  min-h-screen max-h-max justify-center pt-10">
    <div className="w-1/3 cardImg">
        <img className="w-full height cardImg sticky top-36" src={data.movieUrl} alt="" />
    </div>
    <div className="w-2/5 ml-5 pt-8 cardData">
        <h1 className="text-white text-5xl font-bold">{data.name} ({data.year})</h1>
        <p className="pt-2">
        <ReactStars
                size={30}
                value={data.rating>0? data.rating/data.rated:0}
                half={true}
                edit={false}
                />
        </p>
        <p className="mt-2 mb-4">{data.description}</p>
        <Reviews Id={id} prevRating={data.rating} usersRated={data.rated} />
    </div>
    </div>
    }
    </>
)
}

export default Detials;