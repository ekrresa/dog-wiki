import Image from 'next/image';
import { useQuery } from 'react-query';
import { getName } from 'country-list';

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

  console.log(breeds.data);

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
            <div key={breed.id} className="sm:flex mb-8 last:mb-0 overflow-auto">
              <div className="float-left sm:float-none h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 flex-shrink-0 rounded-2xl overflow-hidden relative mr-6 md:mr-10 mb-4 sm:mb-0">
                <Image src={breed.image.url} layout="fill" objectFit="cover" alt="" />
              </div>

              <div>
                <h3 className="font-semibold text-xl md:text-2xl mb-2">{breed.name}</h3>

                <p className="mb-1">
                  <span>The {breed.name} is a </span>
                  <span className="lowercase">{breed.temperament} dog.</span>
                  <span> It was originally developed for </span>
                  <span className="lowercase">{breed.bred_for}.</span>
                  <span> Weight ranges from </span>
                  <span>{breed.weight.metric.split('-').join('to')} kilogrammes.</span>
                  <span> They live on average for </span>
                  <span>{breed.life_span.split('-').join('to')}.</span>
                  {breed.country_code && (
                    <span> Originally bred in {getName(breed.country_code)}.</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
