import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch approved riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["approved-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/approved`);
      return res.data;
    },
  });

  // handle deactivate with SweetAlert
  const handleDeactivate = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be deactivated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#03373D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/riders/update/${id}`, { status: "inactive" });
          refetch();
          Swal.fire("Deactivated!", "The rider has been deactivated.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.log(error);
        }
      }
    });
  };

  // Prioritize search results to appear on top
  const filteredRiders = [...riders].sort((a, b) => {
    if (!search) return 0; // no search, no reordering
    const aMatch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                   a.contact.includes(search) ||
                   a.email?.toLowerCase().includes(search.toLowerCase());
    const bMatch = b.name.toLowerCase().includes(search.toLowerCase()) || 
                   b.contact.includes(search) ||
                   b.email?.toLowerCase().includes(search.toLowerCase());
    if (aMatch && !bMatch) return -1; // a comes first
    if (!aMatch && bMatch) return 1;  // b comes first
    return 0; // maintain original order
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">Approved Riders</h2>

      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search Rider Name/Phone/Email"
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="text-xl" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="table w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Area</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.contact}</td>
                  <td>{rider.warehouse}</td>
                  <td>
                    <span className="badge bg-primary text-black">
                      Approved
                    </span>
                  </td>
                  <td className="text-center flex items-center justify-center">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-sm bg-red-500 text-white flex items-center gap-1"
                      title="Deactivate Rider"
                    >
                      <FaBan />
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No approved riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRiders;
