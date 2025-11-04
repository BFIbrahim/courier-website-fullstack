import React from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";

import { Link } from 'react-router'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data);
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
            <button className='btn w-full bg-gray-300'><FcGoogle></FcGoogle> Login with goolge</button>
        </div>
    )
}

export default Login