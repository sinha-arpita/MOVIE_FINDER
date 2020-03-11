import React from 'react'
import Search  from "../movie/Search"

export const Home = (props) => {
    console.log("Props in Hone ",props)
    return (
        <div>
             <Search {...props}/>        
        </div>
    )
}
