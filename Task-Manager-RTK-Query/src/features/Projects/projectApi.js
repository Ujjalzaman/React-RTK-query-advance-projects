import { apiSlice } from "../api/apiSlice";
// import { addFilterProjects } from '../filter/filterSlice';

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects',
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     try {
            //         const projects = await queryFulfilled;
            //         dispatch(addFilterProjects(projects.data))
            //     } catch (err) {}
            // }
        }),
        getTeamMembers: builder.query({
            query: () => '/team'
        }),
        updateTaskStatusChange: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method:'PATCH',
                body: data
            })
        }),
        deleteCompletedTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            })
        }),
        getTasks: builder.query({
            query: () => '/tasks',
            // async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState}){
            //     const data = await cacheDataLoaded;
            // }
        }),
    })
})
export const { useGetProjectsQuery, useGetTeamMembersQuery, useGetTasksQuery, useUpdateTaskStatusChangeMutation, useDeleteCompletedTaskMutation } = projectApi;

