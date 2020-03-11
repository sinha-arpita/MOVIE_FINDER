import React from 'react'

const Pagination  = (props) => {
    console.log("pagination")
    
    const pageLinks=[]
    let numOfPages = props.pages;
    let x = ""
    if (numOfPages > 10) {
        //want to show not mpre than 10 pages for a search but inform the user if there are more existing pages
        x = "(There are " + parseInt(numOfPages - 10) + " more pages ..)"
    }
    for (let i=1; i<11;i++){
        const active= props.currentPage===i ? "active":""
        pageLinks.push(<li className={`${active}`} key={i}  onClick={()=> props.nextPageHandler(i)} ><a href="#" className="number" >{i}</a></li>)
    }
    return (
        
        <div className="pagination">
          
          <ul>
              {props.currentPage >1 ? <li  onClick={()=>props.nextPageHandler(props.currentpage-1)}><a href="#" className="change" > Prev</a></li>:""}
              {pageLinks}
              {props.currentPage<props.pages+1? <li  onClick={()=>props.nextPageHandler(props.currentPage+1)}><a href ="#"  className="change">  Next { x !== ""? x : ""} </a></li>:""}

          </ul>
          
        </div>
        
    )
}
export default Pagination
