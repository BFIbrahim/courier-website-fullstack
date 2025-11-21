import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const PickupRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPendingParcels = async () => {
      try {
        const res = await axiosSecure.get(`/parcels/pending/${user.email}`);
        setParcels(res.data);
      } catch (error) {
        console.error("Failed to fetch pending parcels", error);
      }
    };

    fetchPendingParcels();
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-secondary">Pending Pickup Requests</h2>

      {parcels.length === 0 ? (
        <p className="text-accent text-lg">No pending parcels to pick up.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-compact w-full border border-gray-300">
            <thead className="bg-primary text-black">
              <tr>
                <th>Tracking ID</th>
                <th>Parcel Name</th>
                <th>Weight (kg)</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Delivery Charge</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td>{p.trackingId}</td>
                  <td>{p.parcelName}</td>
                  <td>{p.parcelWeight}</td>
                  <td>{p.senderName}</td>
                  <td>{p.receiverName}</td>
                  <td>৳{p.deliveryCharge}</td>
                  <td>{p.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setSelectedParcel(p);
                        setModalOpen(true);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Premium Modal */}
      {modalOpen && selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost hover:bg-gray-200"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            {/* Parcel Details */}
            <h3 className="text-2xl font-bold mb-4 text-secondary">{selectedParcel.parcelName}</h3>
            <div className="space-y-2 text-accent text-sm">
              <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
              <p><strong>Weight:</strong> {selectedParcel.parcelWeight} kg</p>
              <p><strong>Sender:</strong> {selectedParcel.senderName}, {selectedParcel.senderAddress}, {selectedParcel.senderDistrict}</p>
              <p><strong>Sender Contact:</strong> {selectedParcel.senderContact}</p>
              <p><strong>Receiver:</strong> {selectedParcel.receiverName}, {selectedParcel.receiverAddress}, {selectedParcel.receiverDistrict}</p>
              <p><strong>Receiver Contact:</strong> {selectedParcel.receiverContact}</p>
              <p><strong>Pickup Warehouse:</strong> {selectedParcel.senderWarehouse}</p>
              <p><strong>Delivery Warehouse:</strong> {selectedParcel.receiverWarehouse}</p>
              <p><strong>Delivery Charge:</strong> ৳{selectedParcel.deliveryCharge}</p>
              <p><strong>Status:</strong> {selectedParcel.status}</p>
              <p><strong>Payment Status:</strong> {selectedParcel.paymentStatus}</p>
              {selectedParcel.pickupInstruction && (
                <p><strong>Pickup Instruction:</strong> {selectedParcel.pickupInstruction}</p>
              )}
              {selectedParcel.deliveryInstruction && (
                <p><strong>Delivery Instruction:</strong> {selectedParcel.deliveryInstruction}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupRequest;
