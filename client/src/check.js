import axios from "axios";
const check=async ()=>{
    try{
        let value=await axios.get("http://localhost:3000/",{
        headers:{
            'token':localStorage.getItem("token")
        }
    });
     return value.data.val;
    }
    catch(err)
    {
        console.log("error: ",err);
    }
    
}
export default check;