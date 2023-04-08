import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRelatedBlogsApiAsync } from '../features/RelatedBlogs/relatedBlogsSlice';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const PostDetailAside = () => {
  const { blog, isLoading, isError, error } = useSelector((state) => state.blog);
  const { relatedBlogs } = useSelector((state) => state.relatedBlogs);
  const { tags, id } = blog;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRelatedBlogsApiAsync({ tags, id }))
  }, [dispatch, tags, id])

  let content;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && relatedBlogs?.length === 0) content = <div>No Found</div>;
  if (!isLoading && !isError && relatedBlogs?.length > 0)
    content = relatedBlogs.map((item) => (
      <div className="card">
        <Link to={`/post/${item.id}`}>
          <img src={item?.image} className="card-image" alt="" />
        </Link>
        <div className="p-4">
          <Link to={`post/${item.id}`} className="text-lg post-title lws-RelatedPostTitle">
            {item?.title}
          </Link>
          <div className="mb-0 tags">
            {
              item.tags.map((tag) => {
                <span key={tag}>{'#' + tag + ' '}</span>
              })
            }
          </div>
          <p>{item?.createdAt}</p>
        </div>
      </div>
    ));

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">Related Posts</h4>
      <div className="space-y-4 related-post-container">

        {content}

      </div>
    </aside>
  )
}

export default PostDetailAside