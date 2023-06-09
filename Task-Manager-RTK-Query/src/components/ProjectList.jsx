import React from 'react'
import Projects from './Projects'
import TeamMembers from './TeamMembers'
import AddNew from './AddNew'

const ProjectList = () => {
    return (
        <div className="container relative">
            <div className="sidebar">
                <Projects />

                <TeamMembers />

            </div>

            <AddNew/>
        </div>
    )
}

export default ProjectList