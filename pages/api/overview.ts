// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await axios.get('https://api.thedogapi.com/v1/breeds?limit=4', {
    headers: { 'x-api-key': process.env.DOG_API_KEY },
  });

  res.status(200).json(response.data);
};
