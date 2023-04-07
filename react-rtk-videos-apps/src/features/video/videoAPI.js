import instance from '../../utils/axios';

export const fetchVideo = async (id) => {
  const response = await instance.get(`/videos/${id}`);
  return response.data;
}
