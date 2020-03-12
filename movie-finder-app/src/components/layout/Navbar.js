import React from 'react'
import{Link,NavLink} from "react-router-dom"


 const Navbar = () => {
    return (
        <div>
             <nav>
                <div className="nav-wrapper" style={{background:"teal"}}>
                     
                    
                     <ul id="nav-mobile"  style={{padding:10}} >
                       <li> <NavLink to="/">Home</NavLink> </li>
                       <li> <NavLink to="/about">About</NavLink></li>
                       <li> <NavLink to = "/contact">Contact</NavLink></li>
                       <li> <NavLink to = "/savedMovies">My Watchlist</NavLink></li>
                    </ul>
              </div>
           </nav>            
        </div>
    )
}
export default Navbar
