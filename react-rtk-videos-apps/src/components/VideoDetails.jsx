import React, { useEffect } from 'react'
import RelatedVideos from './RelatedVideos'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideotAsync } from '../features/video/videoSlice';
import VideoDescription from '../components/VideoDescription';
import VideoFrame from '../components/VideoFrame';
import Loading from './Loading';

const VideoDetails = () => {
    const { video, loading, isError, error } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getVideotAsync(id))
    }, [dispatch, id])

    //decide what to show
    let content;
    if (loading) content = <Loading />
    if (!loading && isError) content = <div className="col-span-12">{error}</div>
    if (!loading && !isError && video?.id === 0) content = <div className="col-span-12">No Videos Found</div>
    if (!loading && !isError && video) content = (
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
                <VideoFrame link={video.link} />
                <VideoDescription video={video} />
            </div>
            <RelatedVideos currentVideoId={video.id} tags={video.tags}/>
        </div>
    )

    return (
        <section className="pt-6 pb-20">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                {content}
            </div>
        </section>
    )
}

export default VideoDetails