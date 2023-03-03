import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { query,where,getDocs} from 'firebase/firestore';
import { usersRefe } from '../Firebase/Firebase';
import bcrypt from 'bcryptjs';
import { useContext } from 'react';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
    const useAppstate=useContext(Appstate);
    const[form,setForm]=useState({
        phoneNumber:"",
        password:""
    });
    const[loading,setLoading]=useState(false);
    const login=async(event)=>{
        event.preventDefault();
        setLoading(true);
        try {
            const quer=query(usersRefe,where('phoneNumber','==',form.phoneNumber))
            const _docs= await getDocs(quer);
            _docs.forEach((doc)=>{
                const _data=doc.data();
                const isUser=bcrypt.compareSync(form.password,_data.password);
                if ((isUser)&&(form.phoneNumber===_data.phoneNumber)) {
                // console.log("hiii");
                    swal({
                        title:"Logged In",
                        icon:"success",
                        button: false,
                        timer:3000
                    });
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.username);
                    // console.log(useAppstate.userName);
                }
            });
            if(useAppstate.login){
                alert("Please enter again... ");
                form.phoneNumber="";
                form.password="";
            }else{
                navigate('/');
            }

        } catch (error) {
            swal({
                title:error,
                icon:"error",
                button: false,
                timer:3000
            });
        }
        setLoading(false);
    }
return (
    <form onSubmit={login}>
    <div className="w-full mt-10 flex flex-col items-center">
        <h1 className="form-heading text-4xl my-2 font-semibold login-title">LOGIN FORM</h1>
        <div className="p-2 w-4/5 my-2 md:w-1/3 login1-input">
    <label  className="leading-7 text-sm  form-heading">Phone Number:</label>
    <input type={'number'} required={true} id="phoneNumber" name="phoneNumber" placeholder="Enter your 03XZ-YYYYYYY" value={form.phoneNumber} onChange={(e)=>setForm({...form,phoneNumber: e.target.value})}
        className="w-full bg-color bg-opacity-50 new-border rounded home text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="md:w-1/3 w-4/5 my-2 p-2 login2-input">
    <label  className="leading-7 text-sm  form-heading">Password:</label>
    <input type={'password'} id="password" required={true} name="password" value={form.password} placeholder="Enter your password" onChange={(e)=>setForm({...form,password: e.target.value})}
        className="w-full bg-color bg-opacity-50 new-border rounded  text-base outline-none text-white home py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    </div>
    <div className="w-1/3 p-2 my-2">
        <button type={'submit'} className="flex mx-auto text-white mt-3  border-0 py-2 px-8 focus:outline-none btn-Header  rounded text-lg login-button">
        {loading? <TailSpin height={30} color='white'/>:"LOGIN"}
        </button>
    </div>
    <div className="mt-2 animated-line">Don't have an account?<Link to={'/signup'}><span className="text-blue-500">  Sign Up</span></Link></div>
    </div>
    </form>
)
}

export default Login;