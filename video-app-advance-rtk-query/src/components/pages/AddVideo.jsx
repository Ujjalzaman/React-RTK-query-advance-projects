import React, { useEffect, useState } from 'react'
import { useAddVideoMutation } from '../../features/api/apiSlice';
import TextInput from '../ui/TextInput';
import TextArea from '../ui/TextArea';
import Error from '../ui/Error';
import Success from '../ui/Success';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
    const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [views, setViews] = useState("");

    const resetFrom = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setLink('');
        setThumbnail('');
        setDate('');
        setDuration('');
        setViews('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const videoInfo = {title, author, description, link, thumbnail, date, duration, views}
        addVideo(videoInfo)
        resetFrom();
    }
    useEffect(() =>{
        if(isSuccess) navigate('/');
    }, [isSuccess, navigate])

    
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="max-w-7xl mx-auto px-5 lg:px-0">
                <div className="w-full">
                    <div className="px-4 sm:px-0 pb-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Add new video
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Please fillup the form to add new video
                        </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                title="Video title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                title="Author"
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <TextArea
                                                title="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <TextInput
                                                title="YouTube Video link"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <TextInput
                                                title="Thumbnail link"
                                                value={thumbnail}
                                                onChange={(e) => setThumbnail(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <TextInput
                                                title="Upload Date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <TextInput
                                                title="Video Duration"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <TextInput
                                                title="Video no of views"
                                                value={views}
                                                onChange={(e) => setViews(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-3 bg-gray-50 text-right sm:px-6"
                                >
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                                {isSuccess && <Success message="Successfully video has been added" />}
                                {isError && <Error message="There was an error" />}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVideo