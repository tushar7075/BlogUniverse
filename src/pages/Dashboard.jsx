import React, { useContext, useEffect, useState } from 'react'
import { D_POSTS } from '../data'
import { Link, useNavigate,useParams} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/loader'
import DeletePost from './DeletePost'
const Dashboard = () => {
  const [posts,setPost] = useState([])
  const navigate = useNavigate();
  const[isLoading,setIsLoading] = useState(false)
  const {id} = useParams();


  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])



  useEffect(()=>{
    const fetchPosts = async ()=>{
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
        setPost(response.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    } 
    fetchPosts()
  },[id])


  if(isLoading){
    return <Loader/>
  }
  return (
    <section className="dashbord">
      {
        posts.length ? <div className="container dashboard_container">
          {
            posts.map(post=>{
              return <article key={post.id} className='dashboard_post'>
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id}/>
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You have no posts yet.</h2>
      }
    </section>
  )
}

export default Dashboard