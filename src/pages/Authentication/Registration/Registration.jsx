import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";


import { Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Registration = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios()

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result);

                const userInfo = {
                    email: data.email,
                    role: 'user',
                    createdAt: new Date().toTimeString(),
                    lastLogin: new Date().toTimeString()
                }

                const userRes = await axiosInstance.post('/users', userInfo)
                console.log(userRes.data)


                const userProfileInfo = {
                    displayName: data.name,
                    photoURL: profilePic,
                }

                updateUserProfile(userProfileInfo)
                    .then(() => {
                        console.log('Profile Picture updated')
                    })
                    .catch(error => {
                        console.log(error)
                    })

                Swal.fire({
                    title: "Registration Successful",
                    text: "Welcome to GoFst",
                    icon: "success",
                    confirmButtonColor: "#CAEB66",
                });
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    const hundleGoogleSIgnIn = () => {
        signInWithGoogle()
            .then(async(result) => {
                console.log(result)

                const user = result.user

                const userInfo = {
                    email: user.email,
                    role: 'user',
                    createdAt: new Date().toTimeString(),
                    lastLogin: new Date().toTimeString()
                }

                const res = await axiosInstance.post('/users', userInfo)
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const hundleImageUpload = async (e) => {
        const userImage = e.target.files[0]

        const formData = new FormData()
        formData.append('image', userImage)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)

        setProfilePic(res.data.data.url)
        console.log(res.data)

    }



    return (
        <div>
            <div className='my-4'>
                <h1 className='text-4xl font-bold text-secondary'>Create an Account</h1>
                <p>Register with GoFast</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <div className="flex flex-col my-4">
                        <label
                            htmlFor="profileImage"
                            className="w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center overflow-hidden transition"
                        >
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="text-6xl text-gray-400" />
                            )}
                        </label>


                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={hundleImageUpload}
                            className="hidden"
                            name='image'
                        />

                        <p className="text-sm text-gray-500 mt-2">Upload your profile photo</p>
                    </div>

                    <label className="label text-secondary">Name</label>
                    <input type="text" {...register('Name', {
                        required: true
                    })} className="input w-full" placeholder="Name" />
                    {
                        errors.Name?.type === 'required' && <p className='text-red-500 font-semibold'>Please enter your name</p>
                    }

                    <label className="label text-secondary">Email</label>
                    <input type="email" {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "enter a Valid Email"
                        }
                    })} className="input w-full" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Please enter email</p>
                    }

                    {
                        errors.email && (
                            <p className='text-red-500 font-semibold' role="alert">{errors.email.message}</p>
                        )
                    }



                    <label className="label text-secondary">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                    })} className="input w-full" placeholder="Password" />

                    {
                        errors.password?.type === 'required' && <p className='text-red-500 font-semibold'>Please enter password</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500 font-semibold'>Minimum password length is 6</p>
                    }

                    <button className="btn mt-4 btn-primary text-black">Register</button>
                </fieldset>
            </form>
            <p className='text-accent'>Alredy have an accout? <Link to="/login" className='text-secondary font-semibold'>Login</Link></p>
            <div className="divider my-8">OR</div>
            <button onClick={hundleGoogleSIgnIn} className='btn w-full bg-gray-300'><FcGoogle></FcGoogle> Sign up with goolge</button>
        </div>
    )
}

export default Registration