import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogApiAsync } from '../features/singleBlog/singleBlogSlice';
import GoHome from '../components/GoHome';
import PostMain from './PostMain';
import PostDetailAside from './PostDetailAside';


const PostDetail = () => {
    const dispatch = useDispatch();
    const { blog } = useSelector((state) => state.blog);
    const { blog_id } = useParams();

    useEffect(() => {
        dispatch(getBlogApiAsync(blog_id))
    }, [dispatch, blog_id])
    return (
        <div>
            <GoHome/>
            <section className="post-page-container">
                <PostMain blog={blog}/>
                <PostDetailAside id={blog?.id} tags={blog?.tags} key={blog.id}/>
            </section>
        </div>
    )
}

export default PostDetail