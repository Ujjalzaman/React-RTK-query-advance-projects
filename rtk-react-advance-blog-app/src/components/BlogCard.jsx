import React from 'react'
import gitImg from '../assets/images/git.webp';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const {id, title, image, likes, isSaved, createdAt, tags} = blog;
    return (
        <div className="lws-card">
            <Link to={`post/1`}>
                <img src={image} className="lws-card-image" alt="" />
            </Link>
            <div className="p-4">
                <div className="lws-card-header">
                    <p className="lws-publishedDate">{createdAt}</p>
                    <p className="lws-likeCount"><i className="fa-regular fa-thumbs-up"></i>{likes}</p>
                </div>
                <Link to={`post/${id}`} className="lws-postTitle"> {title} </Link>
                <div className="lws-tags">
                    {tags.map((tag) =>(
                        <span>{'#' + tag}</span>
                    ))}
                </div>

                <div className="flex gap-2 mt-4">
                    <span className={ isSaved && "lws-badge"}> Saved </span>
                </div>

            </div>
        </div>
    )
}

export default BlogCard