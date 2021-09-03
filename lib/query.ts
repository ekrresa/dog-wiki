import axios from 'axios';

const source = axios.CancelToken.source();
const axiosInstance = axios.create({
  cancelToken: source.token,
  headers: { 'x-api-token': process.env.DOG_API_KEY },
});

export async function apiQueryHandler({ queryKey }: { queryKey: any }) {
  const [, { url }] = queryKey;

  const response = await axiosInstance.get(url);

  //@ts-expect-error
  response.cancel = () => {
    source.cancel('Request was cancelled');
  };

  return response;
}
