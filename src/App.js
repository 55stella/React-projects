import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
// process.env is used to fetch the access key from the .env file.
const clientID =`?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const mounted = useRef(false)
  const[loading, setloading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const[querry, setQuerry] = useState('')
  const[images, setnewImages] = useState(false)
  const fetchData =async()=>{
    setloading(true)
    let url 
    const urlQuerry =`&query=${querry}`
    const urlPage =`&page=${page}`
    if(querry){
      url = `${searchUrl}${clientID}${urlQuerry}`
      // i think after querry, t he data is moved from querry url to main url, then the url page parameter is attached to it


    }else{
      url = `${mainUrl}${clientID}${urlPage}`
      // when we are not typing querry, we are executing ${mainurl}${clientId}{urlpage}
      // command to be executed

    }
    
    
    try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    // we are doing the below becsuse the data that we sre getting from the both url 
    // is not the same so we create or set photo to two things
    setPhotos((oldphotos)=>{
      if(querry && page ===1){
        // it means that if there is a value in the querry parameter and page ==1 i.e
        // we havent started scrolling, then we need to display only data.results. 
        return data.results
      }
      else if(querry){
        // but then if there is querry and maybe page isnt equal to 1, 
        // that means we are already scrolling, please disaply the old page plus the new page.
        //it should display
        // the old paage plus the data.result
        return [...oldphotos, ...data.results]
        // the reason we are doing this is because we are accessing old photos, so we are trying 
        // to keep the old photos especially when we increase the number of pages
      }
      else{
        return [...oldphotos, ...data]
        // else, it should display the default fotos ie when we hadnt started using the querry parameter

      }
      
      // keeping the old photos plus the data. old 
      // photos represents the photos, when when we set old photos to
      // photo, it it means that at every time we change the value of page,
      // we are resetting photos to each value. it impplies the previous value of photo
      // the new value of
    })
    setnewImages(false)
    // ones we arevdone fetching, i want to set it back to false, then wehen we  scroll to the end of 
    // the page, i want to set it back to true
    setloading(false)
    // console.log(data)
      
    } catch (error) {
      
      setnewImages(false)
      setloading(false)
      
    }
    

  }
  useEffect(()=>{
    fetchData()
    // eslint-disable-next-line 
// this will fetch data anytime that the value of the page changes
// its equally going to be running on the first render
  },[page])

  useEffect(()=>{
    if(!mounted){
      // that means if mounted is false, it should become true
      mounted.current = true
      return
    // this will run, it will not trigger a rerender, finslly, it will return
      // the last console.log will not run
    }
    if(!images)return
    // here , we want to run increase our page only when images is set to true, that implies that 
    // we have gotten to the end of the page
    
    if(loading)return
    // we needed to do this when loading is false because when loading is true, we would detch
    // new images but if we do it when loading is false, it imples that we want to increase
    // the value of page, when we increase the value of page, then we are indirectly running the first useEffect that
    // fetched data. we don't want to activate multiple fetch requests
    // we dont want to send so many fetch requests thats why we are setting loading back to false
    // we dont want to increase the page when we are loading
    // we are at the point when we are not loading, then we increase the page
    setPage((oldpage)=>{
      return oldpage +1

    })
    // this will run on the secomd, third or fourth renders
    console.log('heju')
  },[images])
  

//   useEffect(()=>{
//     const event = window.addEventListener('scroll',()=>{
//       if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight -2){
//         // this means that if window.innerheight and window.srollheight is more 
//         // than the the document scroll height, it means we have gotten to the end of the page
//         setPage((oldpage)=>{
//           return oldpage + 1
//         })
      
//       }
      

//     })
//     return ()=> window.removeEventListener('scroll', event)
// // eslint-disable-next-line 

//   },[page])
  const event =()=>{
    if((window.innerHeight + window.scrollY )>= document.body.scrollHeight-2){
      setnewImages(true)

    }

  }

  useEffect(()=>{
    window.addEventListener('scroll',event)
    return ()=>window.removeEventListener('scroll', event)
    
  },[])

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!querry)return
    if(page ===1){
      fetchData()
      // return
    }
    // if the page is already equals to one, fetchdata 
    setPage(1)
    // if page isnt ==1, its going to set it back to 1
      

    
   
    
    // fetchData()
    console.log('hello')

  }
  return <main>
    <section className="search">
      <form  className="search-form">
      {/* <label htmlFor="name">name</label> */}
        <input type="text" placeholder='search'
         className='form-input' value ={querry}  onChange={(e)=>setQuerry(e.target.value)}/>
        <button type='submit' className='submit-btn' onClick={handleSubmit}>
          <FaSearch/>
        </button>
        
      </form>
    </section>

 <section className="photos">
   <div className="photos-center">
     {photos.map((image, index)=>{
      //  console.log(image)
       return <Photo key ={index} {...image}/>

     })}
   </div>
   {loading && <h2 className='loading'>loadind...</h2>}
 </section>
  </main>
}

export default App
