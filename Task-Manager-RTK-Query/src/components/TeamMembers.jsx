import React from 'react'
import { useGetTeamMembersQuery } from '../features/Projects/projectApi'

const TeamMembers = () => {
  const {data:teamMembers, isLoading, isError,error} = useGetTeamMembersQuery();
  // decide what to render 
  let content = null;
  if(isLoading) content = <div>Loading ...</div>
  if(!isLoading && isError) connect = <div> {error}</div>
  if(!isLoading && !isError && teamMembers.length === 0) content = <div> No Content Found!</div>
  if(!isLoading && !isError && teamMembers.length > 0) {
    content =  teamMembers?.map((member) => (
      <div className="mt-3 space-y-4">
          <div className="checkbox-container">
            <img src={`http://127.0.0.1:5173/src/assets/${member?.avatar}`} className="team-avater" />
            <p className="label">{member.name}</p>
          </div>
        </div>
    )) 
  }
  return (
    <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        {content}
      </div>
  )
}

export default TeamMembers