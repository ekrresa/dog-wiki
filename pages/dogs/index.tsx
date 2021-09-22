import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { IoCloseCircle } from 'react-icons/io5';

import {
  apiQueryHandler,
  infiniteQueryHandler,
  QueryHandlerResponse,
} from '../../lib/query';
import { ComboBox } from '../../components/ComboBox';
import { BreedView } from '../../components/Breed';
import { Breed } from '../../lib/types';
import { useBreedContext } from '../../lib/breed';

export default function AllDogs() {
  const { ref, inView, entry } = useInView({
    rootMargin: '0px 0px 500px 0px',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Breed | null>();
  const breedContext = useBreedContext();

  const breedSearch = useQuery<Breed[], AxiosError>(
    ['breedSearch', searchTerm],
    () => apiQueryHandler(searchTerm),
    {
      enabled: searchTerm.length > 0,
    }
  );

  const infiniteBreeds = useInfiniteQuery<QueryHandlerResponse, AxiosError>(
    ['infiniteBreeds'],
    ({ pageParam = 1 }) => infiniteQueryHandler(pageParam),
    {
      getNextPageParam(lastPage) {
        if (lastPage.data.length !== 0) {
          return Number(lastPage.page) + 1;
        }
      },
    }
  );

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      !infiniteBreeds.isFetchingNextPage &&
      !selectedItem &&
      !breedContext?.breed
    ) {
      infiniteBreeds.fetchNextPage();
    }
  }, [breedContext?.breed, entry?.isIntersecting, infiniteBreeds, selectedItem]);

  if (infiniteBreeds.isError) {
    console.log(infiniteBreeds.error.response);
  }

  return (
    <>
      <Head>
        <title>All Breeds - Dog Wiki</title>
        <meta name="description" content="A repository of dogs." />
      </Head>

      <section className="container mb-32 mt-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-6">
          <h1 className="text-4xl flex-auto font-semibold">Breeds of Dogs</h1>

          <ComboBox
            data={breedSearch.data || []}
            loading={breedSearch.isLoading}
            isError={breedSearch.isError}
            onChange={setSearchTerm}
            selectItem={setSelectedItem}
          />
        </div>

        {selectedItem ? (
          <div>
            <h2 className="my-8 text-xl"> Search Results...</h2>
            <BreedView {...selectedItem} />
          </div>
        ) : breedContext?.breed ? (
          <div>
            <h2 className="my-8 text-xl"> Search Results...</h2>
            <BreedView {...breedContext.breed} />
            <button
              className="bg-[#000000cc] flex items-center px-2 py-3 rounded-lg text-sm text-white w-28 sm:w-36 md:w-48"
              onClick={() => breedContext.manageBreed(null)}
            >
              <IoCloseCircle className="text-lg" color="white" />
              <span className="ml-2">Clear search results</span>
            </button>
          </div>
        ) : infiniteBreeds.isLoading ? (
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
            {infiniteBreeds.data?.pages.map(page => (
              <Fragment key={page.page}>
                {page.data.map((breed: Breed) => (
                  <BreedView key={breed.id} {...breed} />
                ))}
              </Fragment>
            ))}
          </section>
        )}

        <div ref={ref}>
          {infiniteBreeds.isFetchingNextPage && inView && (
            <div className="animate-pulse mt-8">
              <div className="h-8 bg-gray-200 mb-4 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
