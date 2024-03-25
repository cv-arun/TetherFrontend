import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import { FormLabel } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useHandleForm from '../costomHooks/usehandleForm';
import axios from '../api.js/axios';
import { Link, useNavigate } from 'react-router-dom'







function Signup() {
    const [data, setData, clearData] = useHandleForm({})
    const [day, setDay] = useState('dd/mm/yyyy');
    const [msg, setMsg] = useState('')
    const [mask, setMask] = useState(true)

    const navigate = useNavigate()

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    const handleSubmit =async () => {
        if(data.password!==data.cpassword){
            scrollToTop()
            return setMsg('Password and Confirm password should match')
        }
        delete data.cpassword
        console.log(data)
       const response = await axios.post('/signup', data)
            console.log(response.data)
            scrollToTop()
            response.data.msg ? setMsg(response.data.msg) : response.data.userId && navigate('/login');
    }
   
    useEffect(() => {
        return clearData()
    }, [])

    return (


        <div>


            <section class="bg-gray-50 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
                    {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a> */}
                    <div class=" w-full  bg-white rounded-lg shadow my-10 md:w-[60%] lg:w-[40%]">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create and account
                            </h1>
                            <span className='text-red-600'>{msg}</span>
                            <div class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        name='email'
                                        onChange={(e) => { setData(e) }} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="fname" class="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                                    <input
                                        type="text"
                                        value={data.fname}
                                        name='fname'
                                        onChange={(e) => { setData(e) }}
                                        id="fname"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="first name" required="" />
                                </div>
                                <div>
                                    <label for="lname" class="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                                    <input
                                        type="text"
                                        value={data.lname}
                                        name='lname'
                                        onChange={(e) => { setData(e) }}
                                        id="lname"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="last name" required="" />
                                </div>
                                <div>
                                    <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 ">Date of birth</label>
                                    <input
                                        type="date"
                                        value={data.dob}
                                        name='dob'
                                        onChange={(e) => { setData(e) }}
                                        id="dob"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="last name" required="" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>

                                    <RadioGroup
                                        name="gender"
                                        onChange={(e) => { setData(e) }}
                                        sx={{ border: 'solid #d1d5db', borderRadius: '5px' }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                            <FormControlLabel value="male" control={<Radio />} label="male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="costom" control={<Radio />} label="Custom" />
                                        </Box>
                                    </RadioGroup>
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
                                <div>
                                    <label for="cpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                    <div className='flex justify-end'>

                                        <input
                                            type={mask ? 'password' : 'text'}
                                            name='cpassword'
                                            onChange={(e) => { setData(e) }}
                                            value={data.cpassword}
                                            id="cpassword"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                                        />
                                        <div className='w-[30px] absolute h-[41px] flex flex-col justify-center cursor-pointer' onClick={() => setMask(!mask)}>
                                            {mask ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="terms" class="font-light text-gray-500 ">I accept the <p class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</p></label>
                                    </div>
                                </div>
                                <button onClick={handleSubmit} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p class="text-sm font-light text-gray-500 ">
                                    Already have an account? <Link to='/login' class="font-medium text-primary-600 hover:underline ">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>



    )
}

export default Signup

