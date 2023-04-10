import instance from "../../utils/instance";
export const relatedBlogsApi = async(tags, id) =>{
    let queryString = '';
    let limit = 5;
    if(tags.length> 0){
        queryString += tags.map(tag => `tags_like=${tag}`).join('&') + `&id_ne=${id}&_limit=${limit}`
    }else{
        queryString +=`&id_ne=${id}&_limit=${limit}`
    }
    const response = await instance.get(`/blogs?${queryString}`);
    return response.data;
}
export default relatedBlogsApi;
