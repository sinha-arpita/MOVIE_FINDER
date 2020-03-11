import React from "react"


const SearchForm = (props)=>{
    
    return (
        <div className="first">
            <section>
            <form onSubmit={props.handleSubmit}>
                <input  className="search"type="text"  placeholder="Type here to search by title ..." onChange={props.changeHandler}/>
                
            </form>
            </section>
        </div>
    )

}
export default SearchForm

