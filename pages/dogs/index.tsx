import Image from 'next/image';
import { useQuery } from 'react-query';
import { apiQueryHandler } from '../../lib/query';
import { Breed } from '../../lib/types';

export default function AllDogs() {
  const breeds = useQuery(
    ['breeds', { url: 'https://api.thedogapi.com/v1/breeds?page=1&limit=10' }],
    apiQueryHandler,
    {
      select: (response): Breed[] => {
        let startIndex = 0;
        return response.data.map((item: any) => ({ ...item, serial: ++startIndex }));
      },
    }
  );

  return (
    <section className="container mb-32 mt-4">
      <h1 className="text-4xl font-semibold">Breeds of Dogs</h1>

      {breeds.isLoading ? (
        <div className="animate-pulse mt-10">
          {new Array(5).fill(1).map((_, index) => (
            <div key={index} className="flex mb-8 last:mb-0">
              <div className="h-48 w-48 bg-gray-200 rounded-2xl mr-10"></div>

              <div className="flex-1">
                <div className="h-8 bg-gray-200 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="mt-10">
          {breeds.data!.map((breed: Breed) => (
            <div key={breed.id} className="flex mb-8 last:mb-0">
              <div className="h-48 w-48 rounded-2xl overflow-hidden relative mr-10">
                <Image src={breed.image.url} layout="fill" objectFit="cover" alt="" />
              </div>

              <div>
                <h3 className="text-2xl mb-2">{breed.name}</h3>

                <p className="flex items-baseline">
                  <span className="font-medium mr-1">Temperament:</span>
                  <span className="font-normal text-sm">{breed.temperament}</span>
                </p>

                <p className="flex items-baseline">
                  <span className="font-medium mr-1">Origin:</span>
                  <span className="font-normal text-sm">{breed.country_code}</span>
                </p>

                <p className="flex items-baseline">
                  <span className="font-medium mr-1">Life Span:</span>
                  <span className="font-normal text-sm">{breed.life_span}</span>
                </p>

                <p className="flex items-baseline">
                  <span className="font-medium mr-1">Primary Purpose:</span>
                  <span className="font-normal text-sm">{breed.bred_for}</span>
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
