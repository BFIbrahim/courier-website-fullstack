import React from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Registration = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result);
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
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className='my-4'>
                <h1 className='text-4xl font-bold text-secondary'>Create an Account</h1>
                <p>Register with GoFast</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
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