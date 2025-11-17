import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaMoneyCheckAlt } from "react-icons/fa";


const formatDate = (iso) => new Date(iso).toLocaleString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const PaymentHistory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`)
      return res.data
    },
    enabled: !!user?.email,
  })

  console.log(payments)

  if (isLoading) {
    return (
      <div className="text-center py-10 text-accent">Loading payment history...</div>
    )
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-secondary flex gap-2 items-center">
       <FaMoneyCheckAlt className='' /> Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-accent text-center">No payments found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg border border-gray-200">
          <table className="table table-zebra w-full">
            <thead className="bg-secondary text-base-100">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Parcel ID</th>
                <th>Amount (৳)</th>
                <th>Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.transectionId}
                  className="hover:bg-primary/10 transition-colors"
                >
                  <td className="text-sm text-gray-900">{index + 1}</td>
                  <td className="font-medium text-secondary">{payment.transectionId}</td>
                  <td className="text-gray-700">{payment.parcelId}</td>
                  <td className="font-semibold text-secondary">{payment.amount}</td>
                  <td className="capitalize text-accent">{payment.paymentMethod}</td>
                  <td className="text-sm text-gray-600">{formatDate(payment.paidAtString)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
