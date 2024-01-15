import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import "./component.css";
export default function Home()
{
    return(
        <div className='home-cont'>
            <h2>Business Card Generator</h2>
            <Link to='/login'><button className='button'>Login</button></Link>
            <Link to='/signup'><button className='button'>Signup</button></Link>
        </div>
    )
}