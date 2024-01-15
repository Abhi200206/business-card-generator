import { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Cards from './Cards';
import "./component.css";
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
    <div  >
      <div className='flexbox-cnt'>
      <div><h2>Business Card Generator</h2></div>
      <div>
      <button className='button' onClick={logout}>Logout</button>
      <button className='button' onClick={()=>navigate(`/user/${username}/cards`)}>cards</button>
      </div>
      </div>
      <div>
      <div className='cont'>
      <h3>Bussiness Card generator</h3>
      <input type="text" name='name' onChange={save} placeholder='enter your name' />
      <br />
      <input type="text" name='description' onChange={save} placeholder='enter your Description' />
      <br />
      <input type="text" name='linkedurl' onChange={save} placeholder='enter your Linkedin url' />
      <br />
      <input type="text" name='twitterurl' onChange={save} placeholder='enter your twitter url' />
      <br />
      <input type="text" name='intrests' onChange={save} placeholder='enter your intrests separated by commas(,) ' />
      <br />
      <button className='button'  onClick={generate}>Generate</button>
      </div>
      <br /> <br />
      {val.disp && <Card val={val} setVal={setVal} />}
      </div>
      
    </div>
  )
}

export default User;
