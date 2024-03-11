import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./component.css";
export default function Home() {
    return (
        <div className='flex justify-center w-full my-4'>
            <div>
                <p className='font-bold text-[20px] bg-gradient-to-r from-blue-200 to-red-500 mb-[40px] p-1 '>Business Card Generator</p>
                <div className='flex justify-between'>
                <Link to='/login'><button className='bg-black text-white text-center cursor-pointer rounded p-2 px-4'>Login</button></Link>
                <Link to='/signup'><button className='bg-black text-white text-center cursor-pointer rounded p-2 px-4'>Signup</button></Link>
                </div>
            </div>
        </div>
    )
}