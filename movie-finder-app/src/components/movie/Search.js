import React from 'react';
import axios from "axios"
import SearchForm from "./SearchForm"
import MovieList from "./MovieList"
import MovieInfo from "./MovieInfo"
import Pagination from "../pagination/Pagination"
import SavedMovies from "./SavedMovies"
import {Route} from  'react-router-dom'
import Select from 'react-select';
import MovieCard from "./MovieCard"
import "./search.css"


//import logo from './logo.svg';

//import './App.css';
// const myKey="a46a614c"
const myKey= process.env.REACT_APP_SECRET_NAME

class  Search extends React.Component {
  constructor(){
    super()
    this.state={
      movies:[],
      search:"",
      year:"",
      totalResults:0,
      currentPage:1,
      selectedOption:{value: 'all', label: 'Select Type'},
      searchDone : false,

      currentMovie:null
    }
  }
  // this function takes the value we type in the search bar and updates the state
  changeHandler=(event)=>{
    this.setState({search:event.target.value, searchDone :false})
  }
   
   options = [
    { value: 'all', label: 'Select Type' },
    { value: 'movie', label: 'Movies' },
    { value: 'episode', label: 'Episode' },
    { value: 'series', label: 'Series' },
  ];
  // this function is from react-select and it selects the option as movies/episode/series and updates the state;by default the value is select type
  optionChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    this.setState({ selectedOption: selectedOption});
    
  };

  // this  function is under the advance search if we want to  do a movie search with a particular year; for ex:Avatar 2011 will show up movies with title Avatar  that released in year 2011 
  yearHandler=(event)=>{
    event.preventDefault()
    this.setState({year:event.target.value})
  }
// if user submits a  non numeric year then it throws an alert ,also there is a check that the year should be between 1900-2020.
  //Depending on  user  search option API is called with the compatible parameters   
  handleSubmit=(event)=>{
    event.preventDefault()
    
    console.log("Key : ", myKey)
    let year = Number(this.state.year)
    if (isNaN(year)) {
      alert("Invalid year " + this.state.year + " Enter a number between 1900 and 2020, ignoring year for now in search" )
      year = null
    }
    if (year) {
      if(year > 2020 || year < 1900)
      {
         alert("Invalid year " + year + " Enter a number between 1900 and 2020, ignoring year for now in search" )
         year = null
      }
    }
    let url = "" 
    
    if (year) {
      url = this.state.selectedOption.value==="all" ? `http://www.omdbapi.com/?apikey=${myKey}&s=${this.state.search}&y=${this.state.year}` : 
                          `http://www.omdbapi.com/?apikey=${myKey}&s=${this.state.search}&type=${this.state.selectedOption.value}&y=${this.state.year}`
    } else {
      url = this.state.selectedOption.value==="all" ? `http://www.omdbapi.com/?apikey=${myKey}&s=${this.state.search}` : 
                          `http://www.omdbapi.com/?apikey=${myKey}&s=${this.state.search}&type=${this.state.selectedOption.value}`
    }

    const get_movies=axios.get(url)
                     .then(res=>{
                        console.log("RESPONSE IS ",res)
                        //if  we get a valid movie/episode or data then only update the state
                        if (res.data.Response === "True") {
                          this.setState({movies:res.data.Search,totalResults:res.data.totalResults, searchDone : true})
                        } else {
                          console.log("Faild to find movie with name ", this.state.search)
                          this.setState({movies:res.data.Search,totalResults:res.data.totalResults, searchDone : true})
                        }

                     }).catch(err=>{
                       console.log("ERROR IS ",err)
                     })


  }
// this function is to display a particular movie(filtering it by the id of the movie) when a user clicks on a particular movie amon all his searches 
  viewMovieInfo=(imdbID)=>{
    console.log("Looking for ", imdbID)
    console.log("Movies ", this.state.movies)
    const filteredMovie=this.state.movies.filter(movie=>{
           console.log("MOVIE HERE",movie.imdbID,imdbID) 
          return movie.imdbID===imdbID
    })
    console.log("Filtered movie ", filteredMovie)
    const newCurrentMovie= filteredMovie.length>0 ?filteredMovie[0]:null
    
    this.setState({currentMovie:newCurrentMovie})
  }
  //this handler is for pagination, calls the API ang get the page number 
  nextPageHandler=(pageNumber)=>{
    console.log("NEXT PAGE",pageNumber)
    const call = axios.get(`http://www.omdbapi.com/?apikey=${myKey}&s=${this.state.search}&page=${pageNumber}`)
                  .then(res =>{
                    console.log("PAGEHANDLE Response",res)
                    this.setState({movies:[...res.data.Search],currentPage:pageNumber})
                    
                  }).catch(err=>{
                    console.log("Error is",err)
                  })

  }

  closeMovie=()=>{
    this.setState({currentMovie:null})
    console.log("Saved movies ", this.state.savedMovies)
  }


  render(){
    console.log("Whole Props ", this.props, this.state)
    console.log("Current movie : ", this.state.currentMovie, this.state.totalResults)
    const  selectedOption  = this.state.selectedOption;
    // In one page it shows 10 results , so getting the total number of pages by dividing the total results  by 10
    const numberOfPages=  Math.floor(this.state.totalResults/10)

    return (
        <div className="App">
          <h2 className="heading">Movie-Finder</h2>
          {            
            
            <div>
              <div  className="page">
                <SearchForm handleSubmit={this.handleSubmit} changeHandler={this.changeHandler} />
                </div>
                <h5 className="advancedSearch"> Advanced Search </h5>
                <div className="para">
                   
                   
                   
                   <Select className="second" value={selectedOption} onChange={this.optionChange} options={this.options} placeholder={this.state.selectedOption.label}/>
                   <form className="year">
                     <input type ="text" name = "year" placeholder="Year (1900 - 2020)" onChange={this.yearHandler}/>
                   </form>
                   <button className="btn waves-effect waves-light"  type="submit" onClick={this.handleSubmit}>Submit</button>
              </div>
              
              <hr></hr>

              {this.state.totalResults > 0 ? <h3 style = {{textAlign : "center"}}> Search matched {this.state.totalResults} items </h3> : 
                   this.state.searchDone ? <h3 style = {{textAlign : "center"}}> No results for title "{this.state.search}" </h3>: ""}
              {(this.state.totalResults> 10 && this.state.currentMovie==null) ?
                   <Pagination nextPageHandler={this.nextPageHandler} pages={numberOfPages} currentPage={this.state.currentPage} /> :""}
              {this.state.totalResults > 0 ? 
                <MovieList movies={this.state.movies} viewMovieInfo={this.viewMovieInfo} saveMovieHandler = {this.props.saveMovieHandler} 
                         /> : ""}
            </div>    
          }
      
        </div>
      );
  }
}
export default Search;
