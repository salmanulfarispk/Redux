import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncMovieorShowDetail,getselectedMovie, removeSelectedMovieorShow } from '../features/movies/MovieSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFilm, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { SpinnerCircular } from 'spinners-react';



export default function MovieDetail() {

  const {imdbID}=useParams()
  

  const dispatch=useDispatch()
  const movieDetails = useSelector(getselectedMovie);


  useEffect(()=>{
     dispatch(fetchAsyncMovieorShowDetail(imdbID))
     return ()=>{
      dispatch(removeSelectedMovieorShow())   //clean up function
     }
  },[dispatch,imdbID])
 
  return (
    <div className='flex justify-evenly py-10 text-fontPrimary font-normal'>
      {!movieDetails || Object.keys(movieDetails).length === 0 ? 
           (<div><SpinnerCircular size={43} thickness={119} speed={148} color="rgba(57, 138, 172, 1)" secondaryColor="rgba(57, 146, 172, 0.44)" />
           </div>  ) : (
     <>
     <div className='left'>
      <div className='text-2xl text-fontPrimary'>{movieDetails.Title}</div>
      <div className='pl-1 mt-5 text-fontSecondary flex '>
         <span className='mr-5'>IMDB Rating 
         <FontAwesomeIcon icon={faStar} className='ms-1 text-yellow-500'/> : {movieDetails.imdbRating}
         </span>
         <span className='mr-5'>IMDB Votes
         <FontAwesomeIcon icon={faThumbsUp} className='ms-1 text-blue-50'/> : {movieDetails.imdbVotes}
         </span>
         <span className='mr-5'> Runtime
         <FontAwesomeIcon icon={faFilm} className='ms-1 text-gray-200'/> : {movieDetails.Runtime}
         </span>
         <span className='mr-5'>year 
         <FontAwesomeIcon icon={faCalendar} className='ms-1 text-orange-200'/> : {movieDetails.Year}
         </span>
      </div>
       <div className='mt-5 leading-normal'>
        {movieDetails.Plot}
       </div>
       <div className='grid grid-cols-1 gap-y-4 '>
        <div className='flex items-center mt-3'>
          <span className='font-semibold'>Director</span>
          <span className='text-fontSecondary ms-14'>{movieDetails.Director}</span>
        </div>
        <div className='flex items-center'>
          <span className='font-semibold'>Stars</span>
          <span className='text-fontSecondary ms-20'>{movieDetails.Actors}</span>
        </div>
        <div className='flex items-center gap-5'>
          <span className='font-semibold'>Generes</span>
          <span className='text-fontSecondary ms-9'>{movieDetails.Genre}</span>
        </div>
        <div className='flex items-center gap-5'>
          <span className='font-semibold'>Langauages</span>
          <span className='text-fontSecondary ms-2'>{movieDetails.Language}</span>
        </div>
        <div className='flex items-center gap-5'>
          <span className='font-semibold'>Awards</span>
          <span className='text-fontSecondary ms-10'>{movieDetails.Awards}</span>
        </div>
       </div>
     </div>

     <div className='flex items-center justify-center ml-5 h-full w-full'>
         <img src={movieDetails.Poster} alt={movieDetails.Title}/>
     </div>
     </>
        )}
    </div>
  )
}
