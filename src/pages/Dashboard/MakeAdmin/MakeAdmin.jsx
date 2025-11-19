import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserAltSlash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: users = [], refetch, isFetching } = useQuery({
    queryKey: ["search-users", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const res = await axiosSecure.get(`/users/search?email=${debouncedSearch}`);
      return res.data;
    },
    enabled: !!debouncedSearch,
  });

  const updateRole = async (id, role) => {
    const actionText = role === "admin" ? "Make Admin" : "Remove Admin";

    // SweetAlert confirmation
    const confirm = await Swal.fire({
      title: `${actionText}?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });

      if (res.data?.message) {
        // SweetAlert success
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }

      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Role update failed",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Make Admin</h2>

      <input
        type="text"
        placeholder="Search user by email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-3 border rounded-lg mb-5 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isFetching && <p className="text-gray-500">Searching...</p>}

      {users.length > 0 ? (
        <div className="overflow-x-auto rounded-md shadow-2xl">
          <table className="table w-full">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 text-center">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => updateRole(user._id, "user")}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto cursor-pointer"
                      >
                        <FaUserAltSlash /> Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => updateRole(user._id, "admin")}
                        className="bg-primary text-black px-3 py-2 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto cursor-pointer"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : debouncedSearch ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <p className="text-gray-400">Search users to see results</p>
      )}
    </div>
  );
};

export default MakeAdmin;
