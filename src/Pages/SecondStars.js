import React from 'react'
import ReactStars from "react-rating-stars-component"

export default function SecondStars() {
    return (
        <div>
           <ReactStars 
              count={5}
              value={5}
              color='gray'
              edit={false}
              size={35}
              isHalf={true}
            //   onChange={direct}
              /> 
        </div>
    )
}