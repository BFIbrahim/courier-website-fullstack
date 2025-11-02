import React from 'react'
import { NavLink } from 'react-router'
import logo from '../../assets/brands/GoFast.png'

const Navbar = () => {

    const navItems = <>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/about">About us</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/rider">Be a rider</NavLink></li>

    </>

    return (
        <div>
            <div className="navbar bg-base-100 rounded-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {navItems}
                        </ul>
                    </div>
                    <a>
                        <img className='w-16 md:w-32' src={logo} alt="" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end flex gap-3">
                    <a className="btn bg-transparent border-primary border-2 hover:bg-primary">Sign In</a>
                    <a className="btn bg-primary border-2 border-primary hover:bg-transparent">Be a rider</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar