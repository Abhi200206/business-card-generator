import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import User from './components/User'
import Cards from './components/Cards'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <div >
     <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login'  exact element={<Login/>}/>
          <Route path='/signup'  exact element={<Signup/>}/>
          <Route path='/user/:username' element={<User/>}/>
          <Route path='/user/:username/cards' element={<Cards/>}/>
        </Routes>
      </Router>

     </div>
    </>
  )
}

export default App
