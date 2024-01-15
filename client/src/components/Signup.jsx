import { Link, Route, Routes,useNavigate } from 'react-router-dom';
import Login from './Login'
import { useState ,useEffect} from 'react';
import "./component.css";
export default function Signup()
{
    const navigate=useNavigate();

    const [obj,setObj]= useState({
        username:"",
        password:"",
        isbutton:false,
        show:false
    })
    useEffect(()=>{
        if(obj.isbutton)
        {
            fetch("http://localhost:3000/signup",{
               method:"POSt",
               headers: {
                'Content-Type': 'application/json'},
                body:JSON.stringify(obj)
            }).then((res)=>res.json()).then((data)=>{
                console.log("data received from client: ",data);
            }).then((r)=>{
                alert("signup successfull now you can login !!!");
            }).then(()=>{
                setObj((obj)=>{
                    return({
                        ...obj,
                        isbutton:false,
                        show:true
                    })
                })
            }).then(()=>{
                navigate('/login')
            })
            
            

        }

    },[obj])
    function save(e)
    {
        setObj((obj)=>{
            return (
                {
                    ...obj,
                    [e.target.name]: e.target.value
                }
            )
        })

    }
    console.log("obj here: ",obj);
    return(
        <div className='signup-cont'>
            <h2>Business Card Generator</h2>
            <div className='inner-signup'>
            <h2>Signup</h2>
            <input  type="text" name='username' onChange={save} placeholder='enter your username' />
            <br />
            <input  type="text" name='password' onChange={save}  placeholder='enter your password' />
            <br />
            <button className='button' onClick={()=>{
                setObj((obj)=>{
                    return(
                        {...obj,
                            isbutton:true
                        }
                    )
                })
            }}>Submit</button>
        </div>
        </div>
    )
}