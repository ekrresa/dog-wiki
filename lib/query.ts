import axios from 'axios';
import { Breed } from './types';

const source = axios.CancelToken.source();
const axiosInstance = axios.create({
  cancelToken: source.token,
  headers: { 'x-api-token': process.env.DOG_API_KEY },
});

type QueryHandlerResponse = {
  data: Breed[];
  page: string;
  total: string;
};

export async function infiniteQueryHandler(pageParam: string) {
  const response = await axiosInstance.get(
    `https://api.thedogapi.com/v1/breeds?page=${pageParam}&limit=10&order=asc`
  );

  const data = {
    data: response.data,
    page: response.headers['pagination-page'],
    total: response.headers['pagination-count'],
  };

  //@ts-expect-error
  data.cancel = () => {
    source.cancel('Request was cancelled');
  };

  return data;
}

export async function apiQueryHandler({
  queryKey,
}: {
  queryKey: any;
}): Promise<QueryHandlerResponse> {
  const [, { url }] = queryKey;

  const response = await axiosInstance.get(url);

  const data = {
    data: response.data,
    page: response.headers['pagination-page'],
    total: response.headers['pagination-count'],
  };

  //@ts-expect-error
  data.cancel = () => {
    source.cancel('Request was cancelled');
  };

  return data;
}
