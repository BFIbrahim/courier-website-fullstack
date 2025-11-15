import React from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../../assets/brands/GoFast.png'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'

const Navbar = () => {

    const { user, logOut } = useAuth()

    const hundleLogout = () => {
        logOut()
        Swal.fire({
            title: "Signed Out",
            text: "You will be logged out of your account.",
            icon: "warning",
            confirmButtonColor: "#CAEB66",
        });
    }

    const navItems = <>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/addparcel" end>Add Parcel</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/about">About us</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/rider">Be a rider</NavLink></li>
        {
          user && <>
            <li><NavLink to="/dashboard/myparcels" end>Dashboard</NavLink></li>
          </>  
        }

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
                    {
                        user ? <Link onClick={hundleLogout} className="btn bg-transparent border-primary border-2 hover:bg-primary">Sign Out</Link> : <Link to="login" className="btn bg-transparent border-primary border-2 hover:bg-primary">Sign In</Link>
                    }
                    <a className="btn bg-primary border-2 border-primary hover:bg-transparent">Be a rider</a>

                    {user && <img className='w-10 h-10 rounded-full' src={user.photoURL} alt="" />}

                </div>
            </div>
        </div>
    )
}

export default Navbar