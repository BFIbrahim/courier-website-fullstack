import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const MyParcels = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    console.log(parcels)


    const handleDelete = async (id) => {
        try {
            
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This parcel will be permanently deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            });

            
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data.deletedCount > 0) {
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Deleted parcel successfully.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                }

                refetch()
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };


    const hundlePay = (id) => {
        console.log(id)
        navigate(`/dashboard/payment/${id}`)
    }

    return (
        <div>
            <div className='border-b-2 border-primary mb-4 pt-4 pb-3 flex justify-around'>
                <h1 className='text-2xl font-bold text-secondary  '>Total Parcels: {parcels.length}</h1>
                
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    
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
                                    <td>{parcel.deliveryCharge}</td>
                                    <td className='flex gap-2 items-center justify-center'>
                                        <button className='btn bg-primary'>view</button>
                                        {
                                            parcel.paymentStatus === 'paid' ?
                                            
                                            <button onClick={() => hundlePay(parcel._id)} className='btn btn-disabled'>Payed</button> 
                                            : 
                                            <button onClick={() => hundlePay(parcel._id)} className='btn bg-yellow-400'>Pay</button> 
                                        }
                                    

                                        <button onClick={() => handleDelete(parcel._id)} className='btn bg-red-400'>Delete</button>
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