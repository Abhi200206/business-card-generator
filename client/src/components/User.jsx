import { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Cards from './Cards';
import "./component.css";
import check from '../check';
function Card({val,setVal})
{  
    useEffect(() => {
        const fetchData = async () => {
          if (val.isClick) {
            console.log("inside");
            try {
              const response = await fetch("http://localhost:3000/cards", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'token':localStorage.getItem("token")
                },
                body: JSON.stringify(val)
              });
      
              const final = await response.json();
              console.log("here ranbhv: ", final);
      
              setVal((v) => {
                return {
                  ...v,
                  isClick: false
                };
              });
      
              console.log("leaving fetch: ", val.isClick);
            } catch (error) {
              console.error("Error:", error);
            }
          }
        };
      
        fetchData();
      }, [val.isClick]);
      
  
  console.log("received: ",val);
  let a=val.intrests.split(",");
  let intrests=a.map((m)=>{
    return(
      <h5>{m}</h5>
    ) 
  });
  return(
    <div  style={{border:"1px  solid black",borderRadius:"2%" ,textAlign:"left",padding:"30px",width:"600px"}}>
      <h2>{val.name}</h2>
      <p>{val.description} </p>
      <h3>Intrests</h3>
      <h5>{intrests}</h5>
      <button className='button' style={{margin:"10px",background:"blue"}}><a style={{color:"white"}} href={val.linkedurl}>Linkedin</a></button>
      <button className='button' style={{margin:"10px",background:"blue"}}><a style={{color:"white"}} href={val.twitterurl}>Twitter</a></button>
      <br />
    </div>
  )
}

function User() {
  const [val,setVal]=useState({
    name:"",
    description:"",
    linkedurl:"",
    twitterurl:"",
    intrests:"",
    isClick:false,
    card:false

  });
  const {username}=useParams();
  let navigate=useNavigate();
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
  console.log("username from hook: ",username)
  function generate()
  {
    setVal((v)=>{
      return(
        {
          ...v,
          disp:true,
          isClick:true,
        }
      )
    })
  }
  function save(e)
  {
      setVal((val)=>{
        return(
          {
            ...val,
          [e.target.name]:e.target.value,
          }


        )
      })
  }
 function logout()
{
  localStorage.removeItem("token");
  navigate('/login');

 }

  return (
    <div className='w-full' >
      <div className='flex justify-between'>
      <div><p className='font-black text-[20px] bg-gradient-to-r from-blue-200 to-red-500 mt-2 ml-2'>Business Card Generator</p></div>
      <div className='flex gap-4 pr-2'> 
      <button className='bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2' onClick={logout}>Logout</button>
      <button className='bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2' onClick={()=>navigate(`/user/${username}/cards`)}>cards</button>
      </div>
      </div>
      <div className='flex justify-center'>
      <div className='border-[2px] p-2 rounded text-center  '>
      <p className='font-bold py-2 mb-2 bg-gradient-to-r from-blue-200 to-red-500'>Bussiness Card generator</p>
      <input className='w-[300px] my-1 border-[1px] rounded px-2' type="text" name='name' onChange={save} placeholder='enter your name' />
      <br />
      <input className='w-[300px] my-1 border-[1px] rounded px-2' type="text" name='description' onChange={save} placeholder='enter your Description' />
      <br />
      <input className='w-[300px] my-1 border-[1px] rounded px-2' type="text" name='linkedurl' onChange={save} placeholder='enter your Linkedin url' />
      <br />
      <input className='w-[300px] my-1 border-[1px] rounded px-2' type="text" name='twitterurl' onChange={save} placeholder='enter your twitter url' />
      <br />
      <input className='w-[300px] my-1 border-[1px] rounded px-2' type="text" name='intrests' onChange={save} placeholder='enter your intrests separated by "," ' />
      <br />
      <button className='w-[300px] bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2'  onClick={generate}>Generate</button>
      </div>
      <br /> <br />
      </div>
      <div className='flex justify-center mt-8 mb-6'>
      {val.disp && <Card val={val} setVal={setVal} />}
      </div>
    </div>
  )
}

export default User;
