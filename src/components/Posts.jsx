import React,{useEffect, useState} from 'react'
import Loader from './loader';
import PostItem from './PostItem'
import axios from 'axios'


const Posts = () =>{
    const [posts,setPost] = useState([]);
    const[isLoading,setLoading] = useState(false)

    useEffect(()=>{
        const fetchPosts = async()=>{
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
                setPost(response?.data)
            } catch (err) {
                console.log(err)
            }

            setLoading(false)
        }

        fetchPosts();
    },[])
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

export default Posts