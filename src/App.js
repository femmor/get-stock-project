import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Loader from "react-loading"
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const App = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])

  const fetchImages = async () => {
    setLoading(true)
    let url;
    url = `${mainUrl}${clientID}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);      
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    fetchImages()
  }, [])

  console.log(photos);

  return(
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder='search' className='form-input'/>
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch/>
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return(
              <Photo key={photo.id} {...photo}/>
            )
          })}
        </div>
        {loading && 
          <div className="loading">
            <Loader type='spin' color="#063251" width={50} height={50}/>
          </div>
        }
      </section>
    </main>
  )
}

export default App
