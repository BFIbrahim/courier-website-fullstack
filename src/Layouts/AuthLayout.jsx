import React from 'react'
import { Outlet } from 'react-router'
import img from '../assets/authImage.png'
import logo from '../assets/brands/GoFast.png'

const AuthLayout = () => {
    return (
        <div>
            <div className="w-11/12 mx-auto md:p-12">
                <img className='md:w-32 w-16' src={logo} alt="" />
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <div className='flex-1'>
                        <img
                            src={img}
                            className="max-w-sm rounded-lg mx-auto"
                        />
                    </div>
                    <div className='flex-1'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout