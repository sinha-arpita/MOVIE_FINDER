import React from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import "./moviecard.css"
const myKey="a46a614c"

 class  MovieCard extends React.Component {
     constructor(props){
         super(props)
         console.log("Moviecard props",props)
         this.state = {
             movie : null
         }
     }
     // calling the API for a given movie id 
    componentDidMount(){
        console.log("IN MOVIE CARD")
           
        axios.get(`http://www.omdbapi.com/?apikey=${myKey}&i=${this.props.match.params.id}`)
                .then(res=>{
                    console.log("For movieCard",res)
                    
                    this.setState({movie  : res.data})
    
                }).catch(err=>{
    
                })
    
     }
     


   render(){
       if (this.state.movie != null) {

       return (
              <div className="allDetail">
                  <img className="image" src = {this.state.movie.Poster} alt="movie cover" style={{height:520, border: "5px solid black", marginLeft: 60}}/>
                  <div className="detail" style={{marginLeft:20}}>
                  <p> Title : {this.state.movie.Title}</p>
                  <p>Year of Release :{this.state.movie.Year}</p>
                 <p>Rated :{this.state.movie.Rated}</p> 
                 <p>  Runtime :{this.state.movie.Runtime}</p>
                  <p>Director :{this.state.movie.Director}</p>
                  <p>Actors :{this.state.movie.Actors}</p>
                  <p>Plot:{this.state.movie.Plot}</p>
                  <p>Awards :{this.state.movie.Awards}</p>
                  
                  <p>Genre:{this.state.movie.Genre}</p>
                  </div>
                 
             
                  <div>
                    
                    <Link to="/" >Home</Link>
                   </div>
            </div>       
       )
             
       } else {
           return (<div></div>)
       }
 }
}
export default MovieCard
