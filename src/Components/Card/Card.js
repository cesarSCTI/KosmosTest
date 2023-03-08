import React from 'react'
import './Card.css'


const Card = ({element, del}) => {
  return (
    <div className={"target "+ "target"+element.id+ " card"}>
    <p onClick={()=>del(element.id)} className="delete">X</p>
    <img  className="cardImg" src={element.url} alt={element.title}/>
    </div>
  )
}

export default Card