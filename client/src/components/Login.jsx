import { Link, Route, Routes,useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import "./component.css";
export default function Login()
{
    const navigate=useNavigate();
    const [obj,setObj]= useState({
        username:"",
        password:"",
        isbutton:false,
        show:false
    })
    useEffect(()=>{
        let value=false;
        if(obj.isbutton)
        {
            fetch("http://localhost:3000/login",{
               method:"POSt",
               headers: {
                'Content-Type': 'application/json'},
                body:JSON.stringify(obj)
            }).then((res)=>res.json()).then((data)=>{
                console.log("data received from client: ",data);
                value=data.name;
                localStorage.setItem("token",data.token)
            }).then((r)=>{
                if(value){
                alert("signup successfull now you can login !!!");
                }
            }).then(()=>{
                setObj((obj)=>{
                    return({
                        ...obj,
                        isbutton:false,
                        show:true
                    })
                })
            }).then(()=>{
                if(value)
                {
                    navigate(`/user/${obj.username}`);
                }
                else{
                    alert("no user found with username, Please Try again ");
                }
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
        <div className='login-cont'>
            <h2 >Business Card Generator</h2>
            <div className='inner-login'>
            <h2>Login</h2>
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