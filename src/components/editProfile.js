import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import updateProfileData from '../api.js/updateProfileData';
import refreshUSer from '../api.js/refreshUser';
import { userReducer } from '../redux/userSlice.js';
import { closeReducer } from '../redux/modal2';

function EditProfile() {
  const dispatch=useDispatch()
  const user = useSelector((state) => state.userReducer.user)
  const [formData,setFormData] = useState({
    firstName: user?.name,
    lastName: user?.lastName,
    DOB: user?.DOB,
    bio: user?.bio,

  })

  const handleSubmit=()=>{
    console.log(formData,'profile update')
    updateProfileData(formData).then(data=>{
      console.log(data)
      refreshUSer().then(data => dispatch(userReducer()))
      .catch(err => console.log(err))
      dispatch(closeReducer())
    })
  }
 

  return (
    <div className='h-80 p-4 overflow-y-auto scrollbar-hide'>
      <div className='grid grid-cols-2 gap-2'>
        <div class="form-group mb-3">
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">First Name</label>
          <input type="text" value={formData.firstName} class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="Enter first Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Last Name</label>
          <input type="text" value={formData.lastName} class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="Enter last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">DOB</label>
        <input type="date" min="1960-01-01" max="2012-12-31" value={formData.DOB} class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
          aria-describedby="emailHelp" onChange={(e) => setFormData({ ...formData, DOB: e.target.value })} />
      </div>
      <div class="form-group mb-3">
        <label for="exampleInputEmail1"  class="form-label inline-block mb-2 text-gray-700">Bio</label>
        <textarea type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Bio..." value={formData?.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}/>
      </div>
      <div class="flex space-x-2 justify-center">
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded 
          shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
           focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
           onClick={handleSubmit}
        >submit</button>
      </div>

    </div>
  )
}

export default EditProfile