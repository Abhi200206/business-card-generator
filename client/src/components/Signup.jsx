import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login'
import { useState, useEffect } from 'react';
import "./component.css";
export default function Signup() {
    const navigate = useNavigate();

    const [obj, setObj] = useState({
        username: "",
        password: "",
        isbutton: false,
        show: false
    })
    useEffect(() => {
        if (obj.isbutton) {
            fetch("http://localhost:3000/signup", {
                method: "POSt",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json()).then((data) => {
                console.log("data received from client: ", data);
            }).then((r) => {
                alert("signup successfull now you can login !!!");
            }).then(() => {
                setObj((obj) => {
                    return ({
                        ...obj,
                        isbutton: false,
                        show: true
                    })
                })
            }).then(() => {
                navigate('/login')
            })



        }

    }, [obj])
    function save(e) {
        setObj((obj) => {
            return (
                {
                    ...obj,
                    [e.target.name]: e.target.value
                }
            )
        })

    }
    console.log("obj here: ", obj);
    return (
        <div className='flex justify-center w-full'>
            <div className='mt-4'>
                <p className='font-black text-[20px] '>Business Card Generator</p>
                <div className='border-[1px] p-2 text-center'>
                    <p className='font-bold pb-2'>Signup</p>
                    <input  className='my-1 border-[1px] rounded px-2' type="text" name='username' onChange={save} placeholder='enter your username' />
                    <br />
                    <input  className='my-1 border-[1px] rounded px-2' type="text" name='password' onChange={save} placeholder='enter your password' />
                    <br />
                    <button className='bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2' onClick={() => {
                        setObj((obj) => {
                            return (
                                {
                                    ...obj,
                                    isbutton: true
                                }
                            )
                        })
                    }}>Submit</button>
                </div>
            </div>
        </div>
    )
}