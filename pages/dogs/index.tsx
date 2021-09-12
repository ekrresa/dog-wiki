import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useCombobox } from 'downshift';
import { IoClose } from 'react-icons/io5';

import {
  apiQueryHandler,
  infiniteQueryHandler,
  QueryHandlerResponse,
} from '../../lib/query';
import { BreedView } from '../../components/Breed';
import { Breed } from '../../lib/types';
import Search from '../../public/search.svg';

export default function AllDogs() {
  const { ref, inView, entry } = useInView({
    rootMargin: '0px 0px 500px 0px',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const breedSearch = useQuery<Breed[], AxiosError>(
    ['breedSearch', searchTerm],
    () => apiQueryHandler(searchTerm),
    {
      enabled: searchTerm.length > 0,
    }
  );

  const {
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    selectedItem,
    reset,
  } = useCombobox({
    items: breedSearch.data || [],
    itemToString: breed => (breed ? breed.name : ''),
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue as string);
    },
  });

  const infiniteBreeds = useInfiniteQuery<QueryHandlerResponse, AxiosError>(
    ['infiniteBreeds'],
    ({ pageParam = 1 }) => infiniteQueryHandler(pageParam),
    {
      enabled: !Boolean(selectedItem),
      getNextPageParam(lastPage) {
        if (lastPage.data.length !== 0) {
          return Number(lastPage.page) + 1;
        }
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting && !infiniteBreeds.isFetchingNextPage && !selectedItem) {
      infiniteBreeds.fetchNextPage();
    }
  }, [entry?.isIntersecting, infiniteBreeds, selectedItem]);

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

          <div className="flex flex-col flex-1 relative">
            <div
              className="flex flex-1 border-2 border-black items-center rounded-[2.5rem]"
              {...getComboboxProps()}
            >
              <input
                className="focus:outline-none flex-1 min-w-[8rem] px-4 py-1 rounded-inherit text-black"
                placeholder="Search"
                {...getInputProps()}
              />
              {selectedItem ? (
                <span className="mr-1" onClick={reset}>
                  <IoClose className="cursor-pointer text-2xl" />
                </span>
              ) : (
                <Search className="mr-1 w-6" />
              )}
            </div>

            <ul
              className={`bg-white border absolute max-h-96 overflow-auto p-1 rounded-[1rem] shadow-md w-full top-[110%] ${
                isOpen ? 'visible' : 'invisible'
              }`}
              {...getMenuProps()}
            >
              {isOpen ? (
                breedSearch.isLoading ? (
                  <li className="p-2 rounded-xl">Loading...</li>
                ) : breedSearch.isError ? (
                  <li className="p-2 rounded-xl">Error...</li>
                ) : breedSearch.isSuccess && breedSearch.data.length > 0 ? (
                  breedSearch.data.map((breed, index) => (
                    <li
                      className={`p-2 rounded-xl ${
                        highlightedIndex === index && 'bg-[#9CA3AF] text-gray-100'
                      }`}
                      key={breed.id}
                      {...getItemProps({ item: breed, index })}
                    >
                      {breed.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 rounded-xl">No results found</li>
                )
              ) : null}
            </ul>
          </div>
        </div>

        {selectedItem ? (
          <div>
            <h2 className="my-8 text-xl"> Search Results...</h2>
            <BreedView {...selectedItem} />
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
