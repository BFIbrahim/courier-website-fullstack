import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  // const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignRiderParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  // Fetch riders
  const { data: riders = [] } = useQuery({
    queryKey: ["ridersList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // Filter parcels to Paid + Pending Pickup
  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.status?.toLowerCase() === "pending pickup" &&
      parcel.paymentStatus?.toLowerCase() === "paid"
  );

  // Filter riders based on parcel.senderDistrict
  const availableRiders =
    selectedParcel
      ? riders.filter(
        (rider) =>
          rider.status === "approved" &&
          rider.warehouse?.toLowerCase() ===
          selectedParcel.senderDistrict?.toLowerCase()
      )
      : [];

  // Open modal
  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    setModalOpen(true);
  };

  const handleAssign = async (rider) => {
    try {
      const res = await axiosSecure.patch(
        `/assign-rider/${selectedParcel._id}`,   // <-- FIXED
        { riderId: rider._id }
      );

      if (res.data.success) {
        Swal.fire({
          title: "Rider Assigned!",
          text: `${rider.name} is now assigned to this parcel.`,
          icon: "success",
          confirmButtonText: "Okay",
          confirmButtonColor: "#3085d6",
        });
      }

      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to assign rider");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-secondary">Assign Rider</h2>

      {filteredParcels.length === 0 ? (
        <p className="text-gray-600">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-secondary text-white">
                <th>Parcel ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredParcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-100">
                  <td>{parcel._id}</td>

                  <td>
                    <p className="font-semibold">{parcel.receiverName}</p>
                    <p className="text-sm text-gray-500">{parcel.address}</p>
                  </td>

                  <td>{parcel.receiverContact}</td>

                  <td className="font-semibold">
                    {parcel.baseCharge +
                      parcel.deliveryCharge +
                      parcel.additionalCharge}{" "}
                    BDT
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-primary rounded-md text-black font-semibold"
                      onClick={() => openAssignModal(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- MODAL ---------------- */}
      {modalOpen && (
        <dialog open className="modal modal-middle">
          <div className="modal-box w-8/12 max-w-4xl">
            <h3 className="font-bold text-lg mb-3 text-secondary">
              Select Rider for Pickup <br />
              <span className="text-sm text-gray-600">
                Sender District: {selectedParcel?.senderDistrict}
              </span>
            </h3>

            {/* Riders Table */}
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Warehouse</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {availableRiders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No riders available for this district.
                      </td>
                    </tr>
                  ) : (
                    availableRiders.map((rider) => {
                      // const isBusy = rider.workStatus === "busy";

                      return (
                        <tr key={rider._id} className="hover:bg-gray-100">
                          <td className="font-semibold">{rider.name}</td>
                          <td>{rider.contact}</td>
                          <td>{rider.warehouse}</td>




                          {/* Action Button */}
                          <td className="text-center">
                            <button

                              onClick={() => handleAssign(rider)}
                              className="btn btn-primary btn-sm text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;
