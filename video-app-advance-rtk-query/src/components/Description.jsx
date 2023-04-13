import React, { useEffect } from 'react'
import deleteImg from '../assets/delete.svg';
import editImg from '../assets/edit.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteVideoMutation } from '../features/api/apiSlice';
import Error from './ui/Error';
const Description = ({ video }) => {
    const { id, title, date, description } = video || {};
    const navigate = useNavigate();

    const [deleteVideo, {isSuccess, isLoading, isError}] = useDeleteVideoMutation();

    const handleDelete = () =>{
        if(id) deleteVideo(id)
    }
    useEffect(() => {
        if(isSuccess) navigate('/');
    }, [isSuccess, navigate])

    return (
        <div>
            <h1
                className="text-lg font-semibold tracking-tight text-slate-800"
            >
                {title}
            </h1>
            <div
                className="pb-4 flex items-center space-between border-b"
            >
                <h2
                    className="text-sm leading-[1.7142857] text-slate-600 w-full"
                >
                    Uploaded on {date}
                </h2>


                <div className="flex gap-10 w-48">
                    <div className="flex gap-1">
                        <div className="shrink-0">
                            <Link to={`/edit/${id}`}>
                                <img
                                    className="w-5 block"
                                    src={editImg}
                                    alt="Edit"
                                />
                            </Link>
                        </div>
                        <Link to={`/edit/${id}`}
                            className="text-sm leading-[1.7142857] text-slate-600"
                        >
                            Edit
                        </Link>
                    </div>
                    <div className="flex gap-1 cursor-pointer"
                        onClick={handleDelete}
                    >
                        <div className="shrink-0">
                            <img
                                className="w-5 block"
                                src={deleteImg}
                                alt="Delete"
                            />
                        </div>
                        <div
                            className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer"
                        >
                            Delete
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="mt-4 text-sm text-[#334155] dark:text-slate-400"
            >
                {description}
            </div>
            {!isLoading && isError && (
                <Error message="There was an error"/>
            )}
        </div>
    )
}

export default Description