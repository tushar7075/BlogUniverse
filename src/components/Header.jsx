import React, { useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../pictures/blog.png'
import { FaBarsStaggered } from "react-icons/fa6";
import {AiOutlineClose} from "react-icons/ai"

import { UserContext } from '../context/userContext';
const Header = () => {
    const{currentUser} = useContext(UserContext)
    const [isNavS,setIsNavS] = useState(window.innerWidth > 800 ? true : false)
    const closeNavHandler = () =>{
        if(window.innerWidth < 800){
            setIsNavS(false);

        }else{
            setIsNavS(true);
        }
    }
  return (

    
    <nav>
        <div className="container nav_container">
            <Link to = "/" className='nav_logo' onClick={closeNavHandler}>
                <img src={Logo} alt="Navbar Icon" />
            </Link>
            {currentUser?.id && isNavS && <ul className="nav_menu">
                <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
                <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
                <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
            </ul>}
            {!currentUser?.id && isNavS && <ul className="nav_menu">
                <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
                <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
            </ul>}
            <button className="nav_toggle-btn" onClick={()=>setIsNavS(!isNavS)}>
                {isNavS ? <AiOutlineClose/> : <FaBarsStaggered/>}
            </button>
        </div>
    </nav>
  )
}

export default Header