import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {

    const user = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    console.log(parcels)

    return (
        <div>
            <h1 className='text-2xl font-bold text-secondary mb-4 pt-4 border-b-2 border-primary'>Total Parcels: {parcels.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='text-center'>
                        <tr>
                            <th></th>
                            <th>Reciever Name</th>
                            <th>Parcel Type</th>
                            <th>Added Date</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {

                            parcels.map((parcel, index) => (
                                <tr key={parcel._id || index}>
                                    <th>{index + 1}</th>
                                    <td className='font-semibold'>{parcel.receiverName}</td>
                                    <td>{parcel.isDocument === true ? "Document" : "Non Document"}</td>
                                    <td>
                                        {parcel?.addedAt
                                            ? new Date(parcel.addedAt).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            : "N/A"}
                                    </td>
                                    <td>{parcel.additionalCharge + parcel.baseCharge + parcel.deliveryCharge}</td>
                                    <td className='flex gap-2 items-center justify-center'>
                                        <button className='btn bg-primary'>view</button>
                                        <button className='btn bg-yellow-400'>Edit</button>
                                        <button className='btn bg-red-400'>Delte</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;