import React from 'react'
import Marquee from 'react-fast-marquee'
import img1 from '../../../assets/brands/amazon.png'
import img2 from '../../../assets/brands/casio.png'
import img3 from '../../../assets/brands/moonstar.png'
import img4 from '../../../assets/brands/randstad.png'
import img5 from '../../../assets/brands/randstad.png'
import img6 from '../../../assets/brands/start-people 1.png'
import img7 from '../../../assets/brands/start.png'

const OurClients = () => {
    return (
        <div className='my-14'>
            <h2 className='text-2xl font-bold text-secondary text-center'>We've helped thousands of sales teams</h2>
            <Marquee className='my-10'>
                <img src={img1} alt="" className="mx-16" />
                <img src={img2} alt="" className="mx-16" />
                <img src={img3} alt="" className="mx-16" />
                <img src={img4} alt="" className="mx-16" />
                <img src={img5} alt="" className="mx-16" />
                <img src={img6} alt="" className="mx-16" />
                <img src={img7} alt="" className="mx-16" />
            </Marquee>


        </div>
    )
}

export default OurClients