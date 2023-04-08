import instance from "../../utils/instance";
export const relatedBlogsApi = async(tags, id) =>{
    let queryString;
    let limit = 5;
    tags?.length > 0 
    ? tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${id}&_limit=${limit}`
    : `&id_ne=${id}&_limit=${limit}`;
    const response = await instance.get(`/blogs?${queryString}`);
    return response.data;
}
export default relatedBlogsApi
