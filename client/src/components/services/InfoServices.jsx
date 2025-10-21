import React from 'react'

export const InfoServices = ({info}) => {
  return (
    <div className='d-flex flex-column justify-content-start align-items-start px-3 py-5'>
      <span className="fw-bolder fs-5 text-center mb-4">{info.title}</span>
      {info.text.map((e, i)=>{
        return(
          <p key={i}>{e}</p>
        )
      })}
    </div>
  )
}
 