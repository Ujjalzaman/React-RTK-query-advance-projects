import React, { useEffect } from 'react'
import Aside from './Aside';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsApiAsync } from '../features/Blog/BlogSlice';
import BlogCard from './BlogCard';
import Loading from './Loading';

const Posts = () => {
    const dispatch = useDispatch();
    const { blogs, isError, isLoading, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(getBlogsApiAsync());
    }, [dispatch])

    let content;
    if(isLoading) content = <Loading/>;
    if(!isLoading && isError) content = <div>{error}</div>;
    if(!isLoading && !isError && blogs?.length === 0) content = <div>No Found</div>;
    if(!isLoading && !isError && blogs?.length > 0) 
    content = blogs.map((blog) =>(
        <BlogCard blog={blog} key={blog.id}/>
    ));

    
    return (
        <section className='wrapper'>
            <Aside />

            <main className="post-container" id="lws-postContainer">
                {content}
            </main>

        </section>
    )
}

export default Posts