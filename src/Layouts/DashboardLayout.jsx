import React from 'react';
import { NavLink, Outlet } from 'react-router';
import logo from '../assets/brands/GoFast.png'
import { TiHome } from "react-icons/ti";
import { FaBoxOpen, FaShippingFast, FaUserEdit, FaMoneyCheckAlt, FaMotorcycle, FaUserShield } from "react-icons/fa";
import { TbMotorbike } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {

    const { role, isLoading } = useUserRole()
    console.log(role)

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Dashboard</div>
                    </div>
                    {/* Page content here */}
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 rounded-md mr-3 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <img className='w-32 mb-3' src={logo} alt="" /><hr className='text-primary' />
                        <li className='mt-2'><NavLink to='/'><TiHome className='text-xl' /> Home</NavLink></li>
                        <li><NavLink to='/dashboard/myparcels'><FaBoxOpen className='text-xl' /> My Parcels</NavLink></li>
                        <li><NavLink to='/dashboard/paymenthistory'><FaMoneyCheckAlt className='text-xl' /> Payment History</NavLink></li>
                        <li><NavLink to='/dashboard/track'><FaShippingFast className='text-xl' /> Track your parcel</NavLink></li>
                        <li><NavLink to='/dashboard/bearider'><TbMotorbike className='text-xl' /> Be a rider</NavLink></li>
                        { !isLoading && role === 'admin' &&
                            <>
                                <li><NavLink to='/dashboard/pending-riders'><FaUserClock className='text-xl' /> Pending Riders</NavLink></li>
                                <li><NavLink to='/dashboard/active-riders'><FaMotorcycle className='text-xl' /> Active Riders</NavLink></li>
                                <li><NavLink to='/dashboard/makeadmin'><FaUserShield className='text-xl' />Make Admin</NavLink></li>
                            </>
                        }
                        <li><NavLink to='/dashboard/updateprofile'><FaUserEdit className='text-xl' /> Update profile</NavLink></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;