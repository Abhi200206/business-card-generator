import {useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import "./component.css";
export default function Cards()
{
    const [cards,setCards]=useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/card",{
            headers:{
                'token':localStorage.getItem("token")
            }
        }).then(async(data)=>{
                let res= await data.json();
            setCards(res);
        })
    },[]);
    let navigate=useNavigate();
    let {username}=useParams();
    let ele=cards.map((val)=>{
        return (
            <div  style={{border:"1px  solid black",borderRadius:"2%" ,textAlign:"left",padding:"30px",width:"600px"}}>
              <h2>{val.name}</h2>
              <p>{val.description} </p>
              <h3>Intrests</h3>
              <h5>{val.intrests.split(",").map((v)=> <h5>{v}</h5>)}</h5>
              <button className='button' style={{margin:"10px",background:"blue"}}><a style={{color:"white"}} href={val.linkedurl}>Linkedin</a></button>
              <button className='button' style={{margin:"10px",background:"blue"}}><a style={{color:"white"}} href={val.twitterurl}>Twitter</a></button>
              <br />
            </div>
          )
    })
    return(
        <div>
            <h3 style={{margin:"10px"}}>User: {username}</h3>
            <button className='button' onClick={()=>navigate(`/user/${username}`)}>Back</button>
        <div>   
            {ele}
        </div>
        </div>
    )
}