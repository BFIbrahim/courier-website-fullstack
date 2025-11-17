import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import riderImg from '../../../assets/agent-pending.png';
import useAuth from "../../../hooks/useAuth";
import warehouseData from '../../../../public/warehouse.json';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
    const { user } = useAuth();
    console.log(user)
    const { register, handleSubmit, setValue } = useForm();
    const [regions, setRegions] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const uniqueRegions = [...new Set(warehouseData.map(item => item.region))];
        setRegions(uniqueRegions);
    }, []);

    useEffect(() => {
        if (user) {
            if (user.displayName) setValue("name", user.displayName);
            if (user.email) setValue("email", user.email);
        }
    }, [user, setValue]);

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        const filtered = warehouseData
            .filter(item => item.region === selectedRegion)
            .map(item => item.district);
        setWarehouses(filtered);
        setValue("warehouse", "");
    };

    const onSubmit = (riderData) => {
        console.log(riderData);

        axiosSecure.post('/riders', riderData)
            .then(res => {
                // Backend response check
                if (res.data.message === "already_applied") {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops!",
                        text: "You have already applied as a rider",
                        confirmButtonColor: "#CAEB66",
                    });
                    return; // stop further execution
                }

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "We will contact you soon.",
                        confirmButtonColor: "#CAEB66",
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong. Please try again.",
                    confirmButtonColor: "#CAEB66",
                });
            });
    };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-6xl p-10">
                <h1 className="text-4xl font-bold text-secondary mb-3">Be a Rider</h1>
                <p className="text-accent max-w-2xl mb-6">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="border-b border-gray-300 mb-10"></div>

                <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full md:w-1/2">
                        <h2 className="text-xl font-semibold text-secondary mb-4">
                            Tell us about yourself
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                            <input {...register("age", { required: true })} type="number" placeholder="Your Age" className="input input-bordered w-full" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input {...register("email", { required: true })} type="email" placeholder="Your Email" className="input input-bordered w-full" readOnly/>

                            <select {...register("region", { required: true })} onChange={handleRegionChange} className="select select-bordered w-full">
                                <option value="" disabled selected>Select your region</option>
                                {regions.map((region, idx) => (
                                    <option key={idx} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input {...register("nid", { required: true })} type="text" placeholder="NID" className="input input-bordered w-full" />
                            <input {...register("contact", { required: true })} type="text" placeholder="Contact" className="input input-bordered w-full" />
                        </div>

                        <select {...register("warehouse", { required: true })} className="select select-bordered w-full">
                            <option value="" disabled selected>Select warehouse</option>
                            {warehouses.map((district, idx) => (
                                <option key={idx} value={district}>{district}</option>
                            ))}
                        </select>

                        <button type="submit" className="btn bg-primary text-black w-full">Submit</button>
                    </form>

                    <img src={riderImg} alt="Rider Illustration" className="md:w-[40%] mx-auto md:mx-0" />
                </div>
            </div>
        </div>
    );
};

export default BeARider;
