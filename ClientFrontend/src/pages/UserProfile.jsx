import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiEditCircleFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import axios from 'axios'


import { UserContext } from '../context/userContext';
const UserProfile = () => {
  const [avatar,setAvatar] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [newConfirmPassword,setNewConfirmPassword] = useState('')
  const [error,setError] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
    const getUser = async()=>{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      const {name,email,avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getUser()
  },[])

  const changeAvatarHandler = async() =>{
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar',avatar);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error)
    }
  }

  
  const updateUserDetails = async(e)=>{
    e.preventDefault();
    try {
      const userData = new FormData()
      userData.set('name',name);
      userData.set('email',email);
      userData.set('currentPassword',currentPassword)
      userData.set('newPassword',newPassword)
      userData.set('newConfirmPassword',newConfirmPassword)

      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,userData,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      if(response.status===200){
        //log user out
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>

        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            {/* Form to update avatar  */}
            <div className='tushar'>
            <form className="avatar_form">
              <input type="file" name='avatar' id='avatar' onChange={e=> setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="avatar"onClick={()=>setIsAvatarTouched(true)}><RiEditCircleFill/></label>
            </form>
            {isAvatarTouched && <button className='profile_avatar-btn' onClick={changeAvatarHandler}><FaCheck/></button>}
            </div>
            

          </div>

          <h1>{currentUser.name}</h1>


          {/* Form to update details */}
          <form action="" className="form profile_form" onSubmit={updateUserDetails}>
            {error && <p className="form_error-message">{error}</p>}
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm New Password' value={newConfirmPassword} onChange={e => setNewConfirmPassword(e.target.value)}/>
            <button type='submit' className='btn primary'>Update details</button>


          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile