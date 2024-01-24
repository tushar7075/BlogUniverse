import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/loader';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const AuthorPosts = () => {
  const [posts,setPost] = useState([]);
    const[isLoading,setLoading] = useState(false)
    const {id} = useParams();

    useEffect(()=>{
        const fetchPosts = async()=>{
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
                setPost(response?.data)
            } catch (err) {
                console.log(err)
            }

            setLoading(false)
        }

        fetchPosts();
    },[id])
    if(isLoading){
        return <Loader/>
    }
    return (
        <section className="posts">
            {posts.length > 0 ? <div className="container post_container">
            {
                posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt})=> 
                <PostItem key={id} postID={id} thumbnail = {thumbnail} category={category} title={title} description={description} authorID = {creator} createdAt={createdAt}/>)
            } 
            </div> : <h2 className='center'>No Posts Found</h2>}
        </section>
    )
}

export default AuthorPosts