import React from 'react'
import { useGetVideoQuery } from '../../features/api/apiSlice';
import { useParams } from 'react-router-dom';
import EditForm from './EditForm';

const Edit = () => {
    const { id } = useParams();
    const { data: video, isSuccess, isLoading, isError } = useGetVideoQuery(id);
    let content = null;
    if (isLoading) {
        content = <div>Loading...</div>;
    }
    if (!isLoading && isError) {
        content = <Error message="There was an error!" />;
    }
    if (!isLoading && !isError && video?.id) {
        content = <EditForm video={video} />;
    }
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="max-w-7xl mx-auto px-5 lg:px-0">
                <div className="w-full">
                    <div className="px-4 sm:px-0 pb-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Edit video
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Please fillup the form to add new video
                        </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        {content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Edit