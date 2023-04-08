import instance from "../../utils/instance";

export const blogsApi = async() =>{
    const response = await instance.get('/blogs');
    return response.data;
}