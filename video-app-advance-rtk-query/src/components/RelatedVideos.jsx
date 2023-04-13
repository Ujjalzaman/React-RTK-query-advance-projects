import React from 'react'
import { useGetRelatedVideosQuery } from '../features/api/apiSlice';
import RelatedVideoLoader from './ui/loaders/RelatedVideoLoader';
import Error from './ui/Error';
import RelatedVideoList from './RelatedVideoList';

const RelatedVideos = ({id, title}) => {
    const {data: relatedVideos, isLoading, isError} = useGetRelatedVideosQuery({id, title});

    // decide what to render
    let content = null;
    if(isLoading){
        content = <><RelatedVideoLoader/><RelatedVideoLoader/><RelatedVideoLoader/><RelatedVideoLoader/><RelatedVideoLoader/></>
    }
    if(!isLoading && isError){
        content = <><Error message="There was an error"/></>
    }
    if(!isLoading && !isError && relatedVideos?.length === 0){
        content = <><Error message="No Videos Found"/></>
    }
    if(!isLoading && !isError && relatedVideos?.length > 0){
        content = relatedVideos.map((video) => <RelatedVideoList key={video.id} video={video}/>)
    }

    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
        >
           {content}
        </div>
    )
}

export default RelatedVideos;

