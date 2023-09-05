import React from 'react'

const Button = ({value ,btnstyle , onclick}) => {
  return (
    <>
    <button className={btnstyle} onClick= {onclick}>{value}</button>
    </>
  )
}

export default Button