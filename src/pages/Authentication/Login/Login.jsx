import React from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";

import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInWithGoogle, signInUser } = useAuth()

    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from || '/'
    const axiosInstance = useAxios()




    const onSubmit = data => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                Swal.fire({
                    title: "Login Successful",
                    text: "Welcome back!",
                    icon: "success",
                    confirmButtonColor: "#CAEB66",
                });
                navigate(from)

            })
            .catch(error => {
                console.log(error)
            })
    }



    const hundleGoogleSIgnIn = () => {
        signInWithGoogle()
            .then(async(result) => {
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

        navigate(from)
    }

    return (
        <div>
            <div className='my-4'>
                <h1 className='text-4xl font-bold text-secondary'>Welcome Back</h1>
                <p>Login with GoFast</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label text-secondary">Email</label>
                    <input type="email" {...register('email',
                        {
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "enter a Valid Email"
                            }
                        })} className="input w-full" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Please enter email address</p>
                    }

                    {
                        errors.email && (
                            <p className='text-red-500 font-semibold' role="alert">{errors.email.message}</p>
                        )
                    }

                    <label className="label text-secondary">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6
                    })} className="input w-full" placeholder="Password" />

                    {
                        errors.password?.type === 'required' && <p className='text-red-500 font-semibold'>Please enter password</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500 font-semibold'>Minimum password length is 6</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn mt-4 btn-primary text-black">Login</button>
                </fieldset>
            </form>
            <p className='text-accent'>Don't have any accout? <Link to="/register" className='text-secondary font-semibold'>Register</Link></p>
            <div className="divider my-8">OR</div>
            <button onClick={hundleGoogleSIgnIn} className='btn w-full bg-gray-300'><FcGoogle></FcGoogle> Login with goolge</button>
        </div>
    )
}

export default Login