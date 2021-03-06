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
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    // Use the search url only if there's something in the input
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((prevData) => {
        if (query && page === 1) {
          return data.results
        }
        else if (query) {
          return [...prevData,...data.results]
        } else {
          return [...prevData,...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);      
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setPage(1)
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // Check the innerHeight of the window
      // Check how far you've scrolled
      // Check the document height

      const innerHeight = window.innerHeight
      const verticalScroll = window.scrollY
      const documentHeight = document.body.scrollHeight

      if (!loading && (innerHeight + verticalScroll) >= documentHeight - 2) {
        // we are at the bottom of the document
        setPage(prevPage => {
          return prevPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])

  return(
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder='search' className='form-input' value={query} onChange={e => setQuery(e.target.value)}/>
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
