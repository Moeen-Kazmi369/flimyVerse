import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { reviewsRefe,db} from '../Firebase/Firebase';
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore';
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { Appstate } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Reviews = ({Id,prevRating,usersRated}) => {
    const useAppstate=useContext(Appstate);
    const navigate=useNavigate();
    const [rate,setRate]=useState();
    const [loading,setLoading]=useState(false);
    const[reviewloading,setreviewLoading]=useState(false);
    const [data,setData]=useState("");
    const[review,setReview]=useState([]);
    const[AddreviewState,setaddreviewState]=useState(false);
    const id=useParams();
    const addReview= async (event)=>{
        event.preventDefault();
        if(useAppstate.login){
        try{
            // setaddreviewState(true);
            setLoading(true);
            // console.log(useAppstate.userName);
            await addDoc(reviewsRefe,{
                thoughts:data,
                movieId:id.id,
                rating:rate,
                name:useAppstate.userName,
                timestamp: new Date().getTime()
            });
            swal({
            title:"Successfully Added",
            icon:"success",
            button: false,
            timer:2000
        })
        const _doc=doc(db,"movies",Id);
        const check=async()=>{
            await updateDoc(_doc,
        {
            rating:prevRating+rate,
            rated:usersRated+1
        })
    } 
    check();
        setRate(0);
        setData("");
        navigate('/');
        setLoading(false);
        setaddreviewState(AddreviewState+1);
        }
        catch(error){
            swal({
                title:error.message,
                icon:"error",
                button: false,
                timer:3000
            });
        setLoading(false);
        }
    }else{
        navigate('/login');
    }
    }
    useEffect(()=>{
    async function getReview(){
        setreviewLoading(true);
        setReview([]);
        for(let i=0;i<=5000000;i++){
        }
        let quer=query(reviewsRefe,where('movieId','==',id.id));
        const _docs=await getDocs(quer);
        _docs.forEach((doc) => {
            setReview((prv)=>[...prv,doc.data()]);
        });
        setreviewLoading(false);
    }
    getReview();
    },[AddreviewState])
return (
    <form onSubmit={addReview}>
    <div className="border-gray-600 border-t-2 w-full">
    <ReactStars
        value={rate}
        edit={true}
        half={true}
        size={35}
        onChange={(rating)=>setRate(rating)}
    />
    <input type="text"
    value={data}
    onChange={(e)=>setData(e.target.value)}
    placeholder='Share your thoughts......'
    className="mt-3 w-full p-2 text-lg bg-color outline-none border-solid"
    />
    <button type={'submit'} className="w-full text-lg btn-Header justify-center flex text-white mt-3 p-2 font-bold rounded-sm">
    {loading? <TailSpin height={32} color='white'/>:"SHARE YOUR THOUGHTS"}
    </button>
    <div className="mt-4">
        {reviewloading? <div className='mt-4 flex justify-center'><ThreeDots height={15} color='red'/></div>:
            review.map((e,i)=>{
                return(
                    <div key={i} className="mt-3 bg-color p-2 border-gray-500 border-b-2">
                    <div><span className="text-blue-700 text-xl font-normal">{e.name}</span><span className="ml-3 text-sm">({new Date(e.timestamp).toLocaleDateString()})</span></div>
                    <div>
                    <ReactStars
                        value={e.rating}
                        edit={false}
                        size={15}
                    />
                    </div>
                    <div>{e.thoughts}</div>
                    </div>
                );
            })   
        }
    </div>   
    </div>
    </form>
)
}

export default Reviews;