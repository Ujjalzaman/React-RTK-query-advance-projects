import instance from '../../utils/axios';

export const fetchrelatedVideos = async ({currentId, tags}) => {
  let limit = 5;
  let queryString = 
  tags?.length > 0
    ? tags.map((tag) => `tags_like=${tag}`).join("&") +
      `&id_ne=${currentId}&_limit=${limit}`
      :`id_ne=${currentId}&_limit=${limit}`
  const response = await instance.get(`/videos/?${queryString}`);
  return response.data;
}
