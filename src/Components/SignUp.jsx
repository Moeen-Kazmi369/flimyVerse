import React from 'react'
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import app from '../Firebase/Firebase';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { usersRefe} from '../Firebase/Firebase';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);
const SignUp = () =>  {
    const[form,setForm]=useState({
        userName:"",
        phoneNumber:"",
        password:""
    });
    const navigate=useNavigate();
    const[loading,setLoading]=useState(false);
    const[otp,sentOtp]=useState(false);
    const[oTP,setOtp]=useState('');
    const generateCapcha=()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
            }
            }, auth);
    }
    const requestOtp=(event)=>{
        event.preventDefault();
        setLoading(true);
        generateCapcha();
        const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+92${form.phoneNumber}`, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
            title:"OTP SENT",
            icon:"success",
            button: false,
            timer:3000
        });
        sentOtp(true);
        setLoading(false);
    }).catch((error) => {
        alert("Please Enter Valid Information.......");
            form.phoneNumber="";
            form.password="";
            form.userName="";
            setLoading(false);
        swal({
                title:error,
                icon:"error",
                button: false,
                timer:3000
            });
    });
}
    const verifyOTP=(event)=>{
        event.preventDefault();
        try {
            setLoading(true);
            window.confirmationResult.confirm(oTP).then((results)=>{
        updataData();
                swal({
            title:"Successfully Registered",
            icon:"success",
            button: false,
            timer:3000
        });
        setLoading(false);
        navigate('/')
            });
        } catch (error) {
            swal({
                title:error,
                icon:"error",
                button: false,
                timer:3000
            });
            navigate('/signup');
        }
    }
    const updataData= async()=>{
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
        await addDoc(usersRefe,{
            username:form.userName,
            phoneNumber:form.phoneNumber,
            password:hash
        })
        } catch (error) {
            swal({
                title:error,
                icon:"error",
                button: false,
                timer:3000
            });
        }
    }
return (
    <div className="w-full mt-10 flex flex-col items-center">
        {/* <h1 className="text-white text-4xl my-2 login-title font-semibold">SIGN UP FORM</h1> */}
    {otp?
    <>
    <form onSubmit={verifyOTP}>
    <h1 className="text-white text-4xl my-2 login-title font-semibold">ENTER OTP CODE</h1>
        <div className="p-2 w-4/5 md:w-1/3 my-2 login1-input">
    <label  className="leading-7 text-sm align-middle form-heading"></label>
    <input id="oTP" required={true} name="oTP" value={oTP} placeholder="Enter your OTP code" onChange={(e)=>setOtp(e.target.value)}
        className="w-full bg-color bg-opacity-50 mt-8 rounded new-border text-base outline-none text-white home py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="w-auto p-2">
        <button  type={'submit'} className="flex mx-auto text-white mt-3 btn-Header border-0 py-2 px-8 focus:outline-none  rounded w-auto text-lg login-button">
        {loading? <TailSpin height={30} color='white'/>:"Confirm OTP"}
        </button>
    </div>
    </form>
    </>
    :
        <>
        <form className="w-full flex items-center flex-col" onSubmit={requestOtp}>
        <h1 className="form-heading text-4xl my-2 login-title font-semibold">SIGN UP FORM</h1>
        <div className="p-2 md:w-1/3 w-4/5 my-2 login1-input">
    <label  className="leading-7 text-sm  form-heading">Name:</label>
    <input type={'text'} required={true} id="name" name="userName" value={form.userName} placeholder="username" onChange={(e)=>setForm({...form,userName: e.target.value})}
    className="w-full bg-color bg-opacity-50 rounded new-border text-base outline-none home text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
        <div className="p-2 w-4/5 md:w-1/3 my-2 login2-input">
    <label  className="leading-7 text-sm  form-heading">Phone Number:</label>
    <input type={'number'} required={true} id="phoneNumber" name="phoneNumber" value={form.phoneNumber} placeholder="03XZ-YYYYYYY" onChange={(e)=>setForm({...form,phoneNumber: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border text-base home outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="md:w-1/3 w-4/5 p-2 my-2 login1-input">
    <label  className="leading-7 text-sm  form-heading">Password:</label>
    <input type={'password'} required={true} id="password" name="password" value={form.password} placeholder="flimy@1234" onChange={(e)=>setForm({...form,password: e.target.value})}
        className="w-full bg-color bg-opacity-50 rounded new-border text-base home outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="w-auto p-2">
        <button type={'submit'} className="flex mx-auto text-white mt-3 btn-Header border-0 py-2 px-8 focus:outline-none  rounded w-auto text-lg login-button">
        {loading? <TailSpin height={30} color='white'/>:"REQUEST OTP"}
        </button>
    </div>
    </form>
    </>
    }
    <div className="mt-2 animated-line">Already have an account?<Link to={'/login'}><span className="text-blue-500">  Log In</span></Link></div>
    <div id='recaptcha-container'></div>
    </div>
)
}

export default SignUp;