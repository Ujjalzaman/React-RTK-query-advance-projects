import React from 'react'
import { useGetProjectsQuery } from '../features/Projects/projectApi'

const Projects = () => {
  const {data:projects, isLoading, isError,error} = useGetProjectsQuery();
  // decide what to render 
  let content = null;
  if(isLoading) content = <div>Loading ...</div>
  if(!isLoading && isError) connect = <div> {error}</div>
  if(!isLoading && !isError && projects.length === 0) content = <div> No Content Found!</div>
  if(!isLoading && !isError && projects.length > 0) {
    content =  projects?.map((project) => (
      <div className="mt-3 space-y-4" key={project.id}>
          <div className="checkbox-container">
            <input type="checkbox" checked  className={`${project.colorClass}`}/>
            <p className="label">{project.projectName}</p>
          </div>
        </div>
    )) 
  }
  return (
    <div>
        <h3 className="text-xl font-bold">Projects</h3>
        {content}
      </div>
  )
}

export default Projects