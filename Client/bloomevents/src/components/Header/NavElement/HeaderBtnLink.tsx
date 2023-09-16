import React from 'react'
import { Link } from 'react-router-dom'
import HeaderBtn from './HeaderBtn'

function HeaderBtnLink({address,name}:any) {
  return (
    <Link to={address} className='header-btn'><HeaderBtn name={name}/></Link>
  )
}

export default HeaderBtnLink