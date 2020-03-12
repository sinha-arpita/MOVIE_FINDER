import React from 'react'

import Navbar from "./components/layout/Navbar"
import{Route} from  'react-router-dom'
import Movie from "./components/movie/Movie"

import Search from "./components/movie/Search"
import {About} from "./components/layout/About"
import {Contact} from "./components/layout/Contact"
import SavedMovies from './components/movie/SavedMovies'
import MovieCard from "./components/movie/MovieCard"



 class  App extends React.Component{

     constructor(){
         super()
         this.state={
             savedMovies:[]
         }
     }
    //this function is called when user wants to save a particular movie and state is updated in the watchlist
    saveMovieHandler=(movie)=>{
        console.log("Saving movie in app", movie)
        alert(movie.Title + " added to  WatchList")
        this.setState({savedMovies:[...this.state.savedMovies,movie]})
        
    }
    // this handler is called when user wants to remove a saved movie from the user watchlist
    removeSavedMovieHandler=(movieToRemove)=>{
        console.log("Remove movie from saved list ", movieToRemove)
        const newSavedMovies = this.state.savedMovies.filter(movie=>{
            return movie.imdbID !== movieToRemove.imdbID 
           
        })
        this.setState({savedMovies:newSavedMovies})
    }
    
    
//this function  is called  when user wants to view the detail of a particular movie he clicks on
    viewMovieInfo=(imdbID)=>{
        console.log("Looking for ", imdbID)
        console.log("Movies ", this.state.movies)
        const filteredMovie=this.state.savedMovies.filter(movie=>{
               console.log("MOVIE HERE",movie.imdbID,imdbID) 
              return movie.imdbID===imdbID
        })
        console.log("Filtered movie ", filteredMovie)
        const newCurrentMovie= filteredMovie.length>0 ?filteredMovie[0]:null
        
        this.setState({currentMovie:newCurrentMovie})
    }

    render(){
          return (
                 <div>
                    <Navbar/>
                       <Route exact path ="/" render={props=><Search {...props} isSaved = "no" saveMovieHandler={this.saveMovieHandler}/>} />
                       <Route path="/about" component={About}/>
                       <Route path="/contact"component={Contact}/>
                       <Route path="/savedMovies" render={props=><SavedMovies {...props} isSaved = "yes" savedMovies = {this.state.savedMovies} 
                                        removeSavedMovieHandler={this.removeSavedMovieHandler} viewMovieInfo={this.viewMovieInfo} />} />
                        <Route path="/movies/:id" render={(props)=><MovieCard {...props} />}/>
                   </div>
         )
     }
 }
export default App
