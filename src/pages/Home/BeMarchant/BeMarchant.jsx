import React from 'react'
import image from '../../../assets/location-merchant.png'

const BeMarchant = () => {
    return (
        <div>
            <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-secondary p-10 rounded-xl text-white my-14">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={image}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className="py-6">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className='flex gap-4'>
                            <button className="btn btn-primary text-black rounded-full">Become a Merchant</button>
                            <button className="btn bg-transparent borrder-2 border-primary text-white rounded-full">Earn with Profast Courier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeMarchant