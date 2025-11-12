import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()


    const { data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data
        }
    })

    console.log(parcelInfo)


    const { _id } = parcelInfo
    const totalAmount = parcelInfo.additionalCharge + parcelInfo.baseCharge + parcelInfo.deliveryCharge

    const amountInCents = totalAmount * 100;

    const hundleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (!card) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        } else {
            setError('')
            console.log(paymentMethod)
        }

        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents
        })

        const clientSecret = res.data.clientSecret

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName
                }

            }
        })

        if (result.error) {
            setError(result.error.message)
        } else {
            setError('')
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment confirm')
                console.log(result)

                const paymentData = {
                    parcelId: _id,
                    email: user.email,
                    amount: totalAmount,
                    transectionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types

                }

                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    console.log('Payment successfull - ')
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: 'Your payment was completed successfully!',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });

                    navigate('/dashboard/myparcels')
                }

            }
        }
        console.log('res from intent', res)
    }

    return (
        <div className='w-[98%] md:w-[70%] mx-auto bg-white p-5 md:p-14 rounded-md shadow-xl'>

            <div className='mb-8'>
                <h1 className='text-xl font-bold text-green-500'>Parcel Info:</h1>
                <p><span className='font-semibold'>Parcel:</span> {parcelInfo.parcelName}</p>
                <p><span className='font-semibold'>Reciever Name:</span> {parcelInfo.receiverName}</p>
                <p><span className='font-semibold'>Delivery zone:</span> {parcelInfo.deliveryZone}</p>
                <p><span className='font-semibold'>Base Charge:</span> {parcelInfo.baseCharge}৳</p>
                <p><span className='font-semibold'>Delivery Charge Charge:</span> {parcelInfo.baseCharge}৳</p>
                <p><span className='font-semibold'>Additional Charge:</span> {parcelInfo.additionalCharge}৳</p>

                <p className='font-semibold text-secondary border-t-2 border-primary mt-3 pt-2'>Total: {totalAmount}৳</p>

            </div>

            <h1 className='text-secondary text-2xl font-bold mb-4'>Payment details - <span className='text-blue-600'>Stripe</span></h1>
            <form onSubmit={hundleSubmit} >
                <p className='text-secondary mb-2 font-semibold'>Please Add your card Information here</p>
                <div className="w-full bg-gray-100 rounded-xl p-3 border border-gray-300  focus-within:border-blue-500 sm:p-4 md:p-5transition
        ">
                    <CardElement className='text-base'>

                    </CardElement>
                </div>
                <p className='text-red-500'>{error}</p>
                <button type='submit' disabled={!stripe} className='btn mt-3 btn-primary text-black w-full'>pay ৳{totalAmount}</button>
            </form>
        </div>
    );
};

export default PaymentForm;