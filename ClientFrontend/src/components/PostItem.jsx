import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'


const PostItem = ({postID,category,title,description,authorID,thumbnail,createdAt}) => {
  const shortdesc = description.length > 100 ?  description.substr(0,100) + '...': description ;
  const shorttitle = title.length > 30 ? title.substr(0,30) + '...' : title;

  return (
    // <div>Postitems</div>
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{shorttitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html:shortdesc}}/>
      </div>
      <div className="post_footer">
        <PostAuthor authorID={authorID} createdAt={createdAt}/>
        <Link to = {`/posts/categories/${category}`} className='btn category'> {category} </Link>
      </div>
    </article>
  )
}

export default PostItem