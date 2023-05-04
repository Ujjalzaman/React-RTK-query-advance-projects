import React from 'react'
import { useGetTasksQuery } from '../features/Projects/projectApi';
import RightSideAction from './RightSideAction';

const AddNew = () => {
    const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

    let content = null;
    if (isLoading) content = <div>Loading ...</div>
    if (!isLoading && isError) connect = <div> {error}</div>
    if (!isLoading && !isError && tasks.length === 0) content = <div> No Content Found!</div>
    if (!isLoading && !isError && tasks.length > 0) {
        content = tasks?.map((task) => (
            <div className="lws-task" key={task.id}>
                <div className="flex items-center gap-2 text-slate">
                    <h2 className="lws-date">26</h2>
                    <h4 className="lws-month">March</h4>
                </div>

                <div className="lws-taskContainer">
                    <h1 className="lws-task-title">{task.taskName}</h1>
                    <span className="lws-task-badge color-scoreboard">{task.status}</span>
                </div>

                <RightSideAction task={task}/>
            </div>
        ))
    }
    return (
        <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
                    <a href="./AddNew.html" className="lws-addnew group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <span className="group-hover:text-indigo-500">Add New</span>
                    </a>
                </div>

                <div className="lws-task-list">
                    {content}
                </div>
            </main>
        </div>
    )
}

export default AddNew