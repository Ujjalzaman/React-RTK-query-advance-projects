import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects'
        }),
        getTeamMembers: builder.query({
            query: () => '/team'
        }),
        getTasks: builder.query({
            query: () => '/tasks'
        }),
    })
})
export const { useGetProjectsQuery, useGetTeamMembersQuery, useGetTasksQuery } = projectApi;

