import React from 'react'

const Button = ({buttonTitle}) => {
  return (
    <div className='input-group-append'>
    <button className='btn btn-primary' type='button'>
      {buttonTitle}
    </button>
  </div>
  )
}

export default Button