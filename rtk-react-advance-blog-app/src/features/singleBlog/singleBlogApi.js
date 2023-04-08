import instance from "../../utils/instance";

export const singleBlogApi = async(id) =>{
    const response = await instance.get(`/blogs/${id}`);
    return response.data;
}