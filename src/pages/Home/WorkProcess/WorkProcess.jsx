import React from 'react'
import vanImg from '../../../assets/bookingIcon.png'

const WorkProcess = () => {
  return (
    <div className='my-10 w-11/12 mx-auto'>
      <h3 className='text-xl font-bold text-secondary mb-5 '>How It Works</h3>
        <div className='md:grid grid-cols-4 gap-5'>
            <div className='py-4 px-4 rounded-xl bg-white'>
                <img src={vanImg} alt="" />
                <h5 className='text-secondary text-[18px] font-bold my-3'>Booking Pick & Drop</h5>
                <p className='text-[16px]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='py-4 px-4 rounded-xl bg-white'>
                <img src={vanImg} alt="" />
                <h5 className='text-secondary text-[18px] font-bold my-3'>Cash On Delivery</h5>
                <p className='text-[16px]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='py-4 px-4 rounded-xl bg-white'>
                <img src={vanImg} alt="" />
                <h5 className='text-secondary text-[18px] font-bold my-3'>Delivery Hub</h5>
                <p className='text-[16px]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='py-4 px-4 rounded-xl bg-white'>
                <img src={vanImg} alt="" />
                <h5 className='text-secondary text-[18px] font-bold my-3'>Booking SME & Corporate</h5>
                <p className='text-[16px]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
        </div>
    </div>
  )
}

export default WorkProcess