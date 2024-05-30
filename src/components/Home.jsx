import React, { useEffect } from 'react'
import MovieList from "../components/MovieList"

import { useDispatch } from "react-redux"
import { fetchAsyncMovies } from '../features/movies/MovieSlice'



function Home() {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchAsyncMovies())
  },[dispatch])

  return (
    <div>
      <div className='bannerimg'></div>
      <MovieList/>
    </div>
  )
}

export default Home