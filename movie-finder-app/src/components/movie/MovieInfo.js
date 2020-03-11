import React from 'react'
import "./movieinfo.css"

 const MovieInfo = (props) => {
     console.log("I am movieInfoProps",props)
     if (props.currentMovie !== null) {
        return (
            <div >
            <div   onClick={props.closeMovie}>
            
                <button style={{padding:10,border:"1px solid black"}}  >Go back</button>
                <div className="both">
                <div className="movie">
                    <p>Movie Title:{props.currentMovie.Title}</p>
                    <p>Year of Release:{props.currentMovie.Year}</p>
                    <p>Type: {props.currentMovie.Type}</p>
                </div>
                <div>
                <img src = {props.currentMovie.Poster} alt="movie cover" style={{height:460, border: "5px solid black"}}/>
                </div>
               </div>
                
            </div>
            </div>
        )
    } else {
        return (
        <div>
            Waiting for movie...    
        </div>)
    }
}
export default MovieInfo

