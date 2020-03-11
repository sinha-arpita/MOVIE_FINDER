import React from 'react'
import Movie from "./Movie"
import "./savedMovies.css"

class SavedMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            savedMovies:[]
            
          }
    }

   
    render() {
        console.log("Saved movies called with ", this.props != null ? this.props : "null")
        if (this.props.savedMovies == null) {
            return <div>This is where u see saved movies...</div>
        }
        return (
            <div >
                
            <h1 style={{textAlign : "center"}} >Total saved contents : {this.props.savedMovies.length}</h1>
              <div className="saved">
              { 
                   this.props.savedMovies.length>0 ?  this.props.savedMovies.map((movie,index) =>{
                       return <Movie className="saved" key={index} isSaved={"yes"} movieId={movie.imdbID}  movie={movie} 
                       viewMovieInfo={this.props.viewMovieInfo} 
                       saveMovieHandler = {this.props.saveMovieHandler}
                       removeSavedMovieHandler={this.props.removeSavedMovieHandler}
                       />
                   }):null   
              }
              </div>
          </div>
        );
    }
}
export default SavedMovies
//cp /Users/arpita/lambdaschool/myprojects/mov/src/* src/