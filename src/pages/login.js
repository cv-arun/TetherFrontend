import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useHandleForm from '../costomHooks/usehandleForm';
import axios from '../api.js/axios'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';





function Login() {



    const [data, setData, clearData] = useHandleForm({});
    const navigate = useNavigate();
    const [mask, setMask] = useState(true)
    const [msg, setMsg] = useState('')


    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: 320,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5
    }
    const handleSubmit = () => {
        axios.post('/login', data).then(response => {
            console.log(response.data)
            response.data?.token && localStorage.setItem('userKey', JSON.stringify(response.data.token))
            response.data?.user && localStorage.setItem('Tether', JSON.stringify(response.data.user))
            response.data?.token && navigate('/')
            response.data.msg ? setMsg(response.data.msg) : setMsg('')
        }).catch(err => console.log(err))
    }
    const credentialResponse = (credentialResponse) => {
        axios.post('/loginGoogle', { credentialResponse }).then((response) => {
            response && localStorage.setItem('userKey', JSON.stringify(response.data.token))
            response && localStorage.setItem('Tether', JSON.stringify(response.data.user))
            response.data.token && navigate('/')
        })
    }

   

    useEffect(() => {
        return clearData()
    }, [])

    return (
        <div >

            <section className="bg-gray-50 min-h-screen flex flex-col justify-center ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {/* <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </div> */}
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <div className=' w-full flex justify-center'>
                                <GoogleLogin
                                    onSuccess={credentialResponse}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                            <div className='flex gap-2 '>
                                <div className='flex flex-col justify-center w-[45%]'><hr className='text-black' /></div>
                                <div><span className='bg-white'>Or</span></div>
                                <div className='flex flex-col justify-center w-[45%]'><hr className='text-black' /></div>
                            </div>

                            <div className="space-y-4 md:space-y-6" >
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        name='email'
                                        onChange={(e) => { setData(e) }}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <div className='flex justify-end'>
                                        <input
                                            type={mask ? 'password' : 'text'}
                                            name='password'
                                            onChange={(e) => { setData(e) }}
                                            value={data.password}
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                                        />
                                        <div className='w-[30px] absolute h-[41px] flex flex-col justify-center cursor-pointer' onClick={() => setMask(!mask)}>
                                            {mask ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" onChange={() => setMask(!mask)} aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                        </div>
                                        <div className="ml-3 text-sm" >
                                            <label for="remember" className="text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</p>
                                </div>
                                <button onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link to='/signup' className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login

