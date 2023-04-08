import instance from '../../utils/axios';

export const fetchrelatedVideos = async ({currentId, tags}) => {
  let limit = 5;
  let queryString;
  if(tags.length > 0){
    queryString += `${tags.map(tag => `tags_like${tag}`).join('&')}&id_ne=${currentId}&_limit=${limit}`
  }else{
    queryString += `{&ne=${currentId}&_limit=${limit}}`
  }
  const response = await instance.get(`/videos/?${queryString}`);
  return response.data;
}
