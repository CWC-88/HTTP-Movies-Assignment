import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";


const UpdateMovieForm = props =>{
    const [movieData, setMovieData] = useState({title: "", director:"", metascore:"", stars:""});
console.log(props)
useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
.then(res =>{
    setMovieData(res.data)
})

}, [props.match.params.id]
)

const changeHandler = e => {
    setMovieData({...movieData, [e.target.name]: e.target.value})

}

const handleSubmit = e => {
    e.preventDefault()
    axios.put(`http://localhouse:5000/api/movies/${movieData.id}` , movieData)
   .then(res =>{
       props.setMovieList(state =>state.map(movie => {
           if (movie.id === movieData.id){
               return res.data 
           }
           else {
               return movie
           }
       }))
       props.history.push(`/`)
   })


}

return (
    <div>
    <form onSubmit ={handleSubmit}>
    <input type="text" name="title" placeholder="title" value = {movieData.title} onChange={changeHandler}/>
    <input type="text" name="director" placeholder="director" value = {movieData.director} onChange={changeHandler}/>
    <input type="text" name="metascore" placeholder="metascore" value = {movieData.metascore} onChange={changeHandler}/>
    <input type="text" name="stars" placeholder="stars" value = {movieData.stars} onChange={changeHandler}/>
<input type="submit" value="submit"/>


    </form>
    </div>
)

}

export default UpdateMovieForm
