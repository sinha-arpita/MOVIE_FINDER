import React from 'react'
import {Link} from "react-router-dom";
import defaultPoster from "./React.js_logo-512.png"

 const Movie = (props) => {
     console.log("showing all movies one by one and the props passed",props)
    return (
        <div>
         
             <span className="info">{props.movie.Title}:{props.movie.Year}</span>
             <div>
                <img src = {props.movie.Poster === "N/A" ? defaultPoster : props.movie.Poster} alt="No movie cover available" style={{height:400,width:400, border: "5px solid black"}}/>
             </div>
             
             <Link className="btn" to={`/movies/${props.movie.imdbID}`}> View Details {props.movie.title}</Link>
             {
                props.isSaved === "no" ? 
                <button className="btn"  onClick={()=>props.saveMovieHandler(props.movie)}>Add to watchlist </button> : 
                <button className="btn"  onClick={()=>props.removeSavedMovieHandler(props.movie)}>Remove from watchlist</button>
             }
             
         

            
        </div>
    )
}
export default Movie
