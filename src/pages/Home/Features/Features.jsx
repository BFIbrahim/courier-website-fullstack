import React from 'react'
import img1 from '../../../assets/live-tracking.png'
import img2 from '../../../assets/safe-delivery.png'

const Features = () => {
    return (
        <div className='border-t-secondary border-dashed border-t-2 pt-14 '>
            <div className=' text-center md:text-start lg:text-start md:flex gap-10 items-center  bg-white px-5 py-4 rounded-xl mb-5'>
                <div className='w-44 h-44 mx-auto md:border-r-2 border-accent border-dashed pr-5 flex items-center'>
                    <img src={img1} alt="" />
                </div>
                <div>
                    <h3 className='text-xl font-bold text-secondary my-4'>Live Parcel Tracking</h3>
                    <p className='text-accent'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            <div className=' text-center md:text-start lg:text-start md:flex gap-10 items-center  bg-white px-5 py-4 rounded-xl mb-5'>
                <div className='w-44 h-44 mx-auto md:border-r-2 border-accent border-dashed pr-5 flex items-center'>
                    <img src={img2} alt="" />
                </div>
                <div>
                    <h3 className='text-xl font-bold text-secondary my-4'>Live Parcel Tracking</h3>
                    <p className='text-accent'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            <div className=' text-center md:text-start lg:text-start md:flex gap-10 items-center  bg-white px-5 py-4 rounded-xl mb-5'>
                <div className='w-44 h-44 mx-auto md:border-r-2 border-accent border-dashed pr-5 flex items-center'>
                    <img src={img2} alt="" />
                </div>
                <div>
                    <h3 className='text-xl font-bold text-secondary my-4'>Live Parcel Tracking</h3>
                    <p className='text-accent'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
        </div>
    )
}

export default Features