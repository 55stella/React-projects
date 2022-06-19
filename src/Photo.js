import React from 'react'

const Photo = ({urls:{regular}, alt_discription, likes,
  user:{name,portfolio_url, profile_image:{medium}}}) => {
  return <article className='photo'>
    <img src={regular} alt={alt_discription} />
    <div className="photo-info">
      <h4>{name}</h4>
      <p>{likes} likes</p>
      <a href={portfolio_url}>
        <img src={medium} alt={name}  className='user-img'/>
      </a>
    </div>
    
  </article>
}

export default Photo


// window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2