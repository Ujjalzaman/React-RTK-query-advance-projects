import React from 'react';
import GoHome from '../components/GoHome';
import PostMain from './PostMain';
import PostDetailAside from './PostDetailAside';

const PostDetail = () => {
    return (
        <div>
            <GoHome/>
            <section className="post-page-container">
                <PostMain/>
                <PostDetailAside/>
            </section>
        </div>
    )
}

export default PostDetail