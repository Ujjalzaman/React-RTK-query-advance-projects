import React from 'react'
import gitImg from '../assets/images/git.webp';
import Aside from './Aside';
import { Link } from 'react-router-dom';


const Posts = () => {
    return (
        <section className='wrapper'>
            <Aside/>
        <main class="post-container" id="lws-postContainer">
            <div className="lws-card">
                <Link to={`post/1`}>
                    <img src={gitImg} className="lws-card-image" alt="" />
                </Link>
                <div className="p-4">
                    <div className="lws-card-header">
                        <p className="lws-publishedDate">2023-05-01</p>
                        <p className="lws-likeCount"><i className="fa-regular fa-thumbs-up"></i>100</p>
                    </div>
                    <Link to={`post/1`} className="lws-postTitle"> Top Github Alternatives </Link>
                    <div className="lws-tags"><span>#python,</span> <span>#tech,</span> <span>#git</span></div>

                    <div className="flex gap-2 mt-4">
                        <span className="lws-badge"> Saved </span>
                    </div>

                </div>
            </div>
        </main>

        </section>
    )
}

export default Posts