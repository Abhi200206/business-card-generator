import {useNavigate,useParams} from 'react-router-dom';
import "./component.css";
import { useEffect } from 'react';
import Rendercards from "./Rendercards";
import { RecoilRoot } from 'recoil';
import check from '../check';
export default function Cards()
{
    let navigate=useNavigate();
    let {username}=useParams();
    useEffect(()=>{
        let bool=check();
        bool.then((val)=>{
          console.log("bool val: ",val);
        if(!val)
        {
            navigate('/login')
        }
        })
      },[]);
   
    return(
        <RecoilRoot>
        <div className='w-full'>
            <h3 style={{margin:"10px"}}>User: {username}</h3>
            <button className='bg-black text-white text-center cursor-pointer  rounded p-2 px-4 m-2' onClick={()=>navigate(`/user/${username}`)}>Back</button>
        <div >   
            <Rendercards/>
        </div>
        </div>
        </RecoilRoot>
    )
}