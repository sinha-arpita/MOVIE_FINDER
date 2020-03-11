import React from 'react'
import Movie from "./Movie"

 const MovieList = (props) => {
     
       return (
          <div className="movielist">
            {

                 props.movies.length>0 ?  props.movies.map((movie,index) =>{
                     //movie id is return as imbID from the API
                     return <Movie key={index} movieId={movie.imdbID}  isSaved = {"no"} movie={movie} viewMovieInfo={props.viewMovieInfo} saveMovieHandler = {props.saveMovieHandler}removeSavedMovieHandler={props.removeSavedMovieHandler}/>
                 }):"No movies ..."   
            }
        </div>
    )
       
}
export default MovieList
