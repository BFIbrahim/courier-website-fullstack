import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // Approve rider
  const handleApprove = async (id, email) => {
    Swal.fire({
      title: "Approve Rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/riders/update-status/${id}`, {
            action: "approve",
            email,
          });
          refetch();
          Swal.fire("Approved!", "Rider approved successfully.", "success");
          if (selectedRider?._id === id) setSelectedRider(null);
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(error);
        }
      }
    });
  };

  // Decline rider
  const handleDecline = async (id, email) => {
    Swal.fire({
      title: "Decline Rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Decline",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/riders/update-status/${id}`, {
            action: "decline",
            email,
          });
          refetch();
          Swal.fire("Declined!", "Rider request declined.", "info");
          if (selectedRider?._id === id) setSelectedRider(null);
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary mb-6">
        Pending Riders
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="table">
          <thead className="bg-secondary text-white text-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Contact</th>
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {riders.length > 0 ? (
              riders.map((rider, index) => (
                <tr key={rider._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.region}</td>
                  <td>{rider.warehouse}</td>
                  <td>{rider.contact}</td>

                  <td className="flex gap-2 items-center">
                    <button
                      onClick={() => handleApprove(rider._id, rider.email)}
                      className="btn btn-sm bg-primary text-secondary w-10 h-10 flex items-center justify-center"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => handleDecline(rider._id, rider.email)}
                      className="btn btn-sm bg-yellow-500 text-black w-10 h-10 flex items-center justify-center"
                      title="Decline"
                    >
                      <FaTimes />
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => setSelectedRider(rider)}
                      className="btn btn-sm bg-secondary text-white"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-accent">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl relative">
            <h3 className="font-bold text-xl mb-4 text-secondary">
              Rider Details
            </h3>

            <div className="space-y-2 text-accent">
              <p>
                <b>Name:</b> {selectedRider.name}
              </p>
              <p>
                <b>Age:</b> {selectedRider.age}
              </p>
              <p>
                <b>NID:</b> {selectedRider.nid}
              </p>
              <p>
                <b>Region:</b> {selectedRider.region}
              </p>
              <p>
                <b>Warehouse:</b> {selectedRider.warehouse}
              </p>
              <p>
                <b>Contact:</b> {selectedRider.contact}
              </p>
            </div>

            <div className="modal-action justify-start gap-2">
              <button
                onClick={() =>
                  handleApprove(selectedRider._id, selectedRider.email)
                }
                className="btn bg-primary text-secondary btn-sm flex items-center justify-center w-10 h-10"
                title="Approve"
              >
                <FaCheck />
              </button>

              <button
                onClick={() =>
                  handleDecline(selectedRider._id, selectedRider.email)
                }
                className="btn bg-yellow-500 text-black btn-sm flex items-center justify-center w-10 h-10"
                title="Decline"
              >
                <FaTimes />
              </button>

              <button
                className="btn bg-primary text-white btn-sm flex items-center justify-center w-10 h-10"
                onClick={() => setSelectedRider(null)}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => setSelectedRider(null)}
          />
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
