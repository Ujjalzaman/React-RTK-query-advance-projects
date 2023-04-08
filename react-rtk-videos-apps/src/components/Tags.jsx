import React, { useEffect } from 'react'
import { getTagstAsync } from '../features/tags/tagsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Tag from './Tag';

const Tags = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.tags);

    useEffect(() => {
        dispatch(getTagstAsync());
    }, [dispatch])

    return (
        <section>
            <div
                className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto"
            >
                {tags.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
                ))}
            </div>
        </section>
    )
}

export default Tags