import React, { useEffect } from 'react'
import { getRelatedVideoAsync } from '../features/relatedVideos/relatedvideosSlice';
import { useDispatch, useSelector } from 'react-redux';
// import Loading from './Loading';
// import RelatedVideoSingle from './RelatedVideoSingle';

const RelatedVideos = ({ currentVideoId, tags }) => {
    const data = useSelector((state) => state.RelatedVideos);
    console.log(data)
    // const {RelatedVideos} = useSelector((state) => state.RelatedVideos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRelatedVideoAsync({ currentVideoId, tags }))
    }, [dispatch, currentVideoId, tags])

    //decide what to show
    let content;
    // if(loading) content = <Loading/>
    // if(!loading && isError) content =  <div className="col-span-12">{error}</div>
    // if(!loading && !isError && RelatedVideos?.length ===0) content =  <div className="col-span-12">No Videos Found</div>
    // if(!loading && !isError && RelatedVideos?.length >0) 
    // content =  RelatedVideos.map((video) => <RelatedVideoSingle key={video.id} video={video}/>)
    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
        >
           {/* {content} */}
        </div>
    )
}

export default RelatedVideos