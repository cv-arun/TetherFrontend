import React, { useEffect, useState } from 'react';

import updatePassword from '../api.js/updatePassword';


function Settings() {
    const [msg, setMsg] = useState({})
    const [tab, setTab] = useState('1');
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        console.log(tab)
    }, [tab])
    const handleClick = (e) => {
        console.log(e.target)
        setTab(e.target.id)
    }

    const validate = (data) => {

        errors.currentPassword = !data.currentPassword ? 'This field required' : null
        errors.newPassword = !data.newPassword ? 'This field required' : null
        errors.confirmPassword = !data.confirmPassword ? 'This field required' : null
        errors.confirmPassword = data.newPassword !== data.confirmPassword ? 'password should be matching' : null
        setErrors({ ...errors })
        if (!errors.currentPassword && !errors.newPassword && !errors.confirmPassword) {
            return true
        } else { return false }
    }
    

    const onSubmit = e => {
        e.preventDefault()
        let valid = validate(form)
        valid && updatePassword(form).then(response => {
            console.log(response)
            setMsg(response)

        })
    };
    return (
        <>
            <div className='border-x-2 bg-white  max-w-[690px] min-h-[80vh] mx-auto shadow-md flex flex-col rounded-md p-3'>
                <div className='flex gap-10' id='4' onClick={handleClick}>
                    <button className='focus:ring-2 p-3 ' id='1'>Password</button>

                    <button className='focus:ring-2 p-3' id='2'>Privacy</button>
                </div>
                <hr />

                {tab == '1' && <div >
                    <div className='mx-auto w-2/3 flex flex-col gap-6 py-3 '>
                        <h1 className='text-3xl'>Change password</h1>
                        <form onSubmit={onSubmit}>
                            <p className={msg?.color}>{msg?.text}</p>
                            <div class="form-group mb-6 ">
                                <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Current Password</label>
                                <input type="password" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out m-0
                             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword0"
                                    placeholder=" current Password" name='currentPassword' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                                    onBlur={()=>validate(form)}/>
                                {errors.currentPassword && <span className='text-red-600'>{errors.currentPassword}</span>}
                            </div>
                            <div class="form-group mb-6">
                                <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">New Password</label>
                                <input type="password" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out m-0
                             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
                                    placeholder="New Password" name='newPassword' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                                    onBlur={()=>validate(form)}/>
                                {errors.newPassword && <span className='text-red-600'>{errors.newPassword}</span>}
                            </div>
                            <div class="form-group mb-6">
                                <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Confirm Password</label>
                                <input type="password" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out m-0
                             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword3"
                                    placeholder="Confirm Password" name='confirmPassword' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                                    onBlur={()=>validate(form)}/>
                                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword}</span>}
                            </div>
                            <div class="flex space-x-2 justify-center">
                                <button
                                    type="submit"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded 
                                      shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                                       focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                                >submit</button>
                            </div>
                        </form>
                    </div>
                </div>}
                {tab === '2' && <div>  This is our beta version more setiings and features are coming in upcoming version.<br/>stay tuned...</div>}

            </div>
        </>
    )
}

export default Settings