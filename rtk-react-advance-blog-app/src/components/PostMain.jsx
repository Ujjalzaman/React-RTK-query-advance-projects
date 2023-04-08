import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogApiAsync } from '../features/singleBlog/singleBlogSlice';

const PostMain = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);
  const { blog_id } = useParams();
  const { title, description, image, tags, likes, isSaved } = blog || {};

  useEffect(() => {
    dispatch(getBlogApiAsync(blog_id))
  }, [dispatch, blog_id])
  return (
    <main className="post">
      <img src={image} alt="githum" className="w-full rounded-md" id="lws-megaThumb" />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          {
            tags?.map((tag) => (
              <span key={tag + '45'}>{'#' + tag + ' '}</span>
            ))
          }
        </div>
        <div className="btn-group">

          <button className="like-btn" id="lws-singleLinks">
            <i className="fa-regular fa-thumbs-up"></i> {likes}
          </button>

          <button className={isSaved ? 'active save-btn' : 'save-btn'} id="lws-singleSavedBtn">
            <i className="fa-regular fa-bookmark"></i> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
        <div className="mt-6">
          <p>
            {description}
          </p>
        </div>
      </div>
    </main>
  )
}

export default PostMain