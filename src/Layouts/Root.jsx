import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/SharesComponents/Navbar'
import Footer from '../pages/SharesComponents/Footer'

const Root = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Root