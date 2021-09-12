import { useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';

import { ComboBox } from '../components/ComboBox';
import { Breed } from '../lib/types';
import { apiQueryHandler } from '../lib/query';
import Paw from '../public/paw.svg';

export default function Home(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Breed | null>();

  const breedSearch = useQuery<Breed[], AxiosError>(
    ['breedSearch', searchTerm],
    () => apiQueryHandler(searchTerm),
    {
      enabled: searchTerm.length > 0,
    }
  );

  if (props.error) {
    return <div className="text-center text-lg">{props.error}</div>;
  }

  return (
    <>
      <Head>
        <title>Home - Dog Wiki</title>
        <meta name="description" content="A repository of dogs." />
      </Head>

      <main className="container">
        <section className="isolate overflow-hidden rounded-t-large relative bg-hero-color flex justify-between">
          <section className="flex flex-col flex-shrink justify-center text-white pl-6 pr-2 pb-12 pt-7 md:pl-20">
            <div className="flex items-center">
              <span className="text-3xl md:text-5xl font-cursive mr-5">DogWiki</span>
              <Paw className="w-16 hidden md:block" />
            </div>

            <p className="mt-7 mb-10 text-xl">Get to know more about your dog breed</p>

            <div className="flex items-center rounded-large2 py-3">
              <ComboBox
                className="px-4 py-2"
                data={breedSearch.data || []}
                loading={breedSearch.isLoading}
                isError={breedSearch.isError}
                onChange={setSearchTerm}
                selectItem={setSelectedItem}
              />
            </div>
          </section>

          <img
            className="absolute inset-0 sm:static z-[-1] flex-grow-0 object-cover max-w-heroImg min-w-[8rem] rounded-tr-large"
            src="/hero.jpg"
            alt=""
          />
        </section>

        <section className="rounded-b-large bg-hero-down px-6 md:px-20 pt-10 pb-10">
          <h2 className="inline-block text-primary text-lg">Most Searched Breeds</h2>
          <div className="bg-mud rounded-3xl max-w-tiny p-[1.6px]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h2 className="max-w-breed mt-10 font-semibold text-primary text-4xl">
              99+ Breeds for you to discover
            </h2>

            <Link href="/dogs" passHref>
              <a className="flex items-end sm:justify-end text-enamel whitespace-nowrap">
                <span className="font-semibold uppercase">see more</span>
                <span className="ml-2">&rarr;</span>
              </a>
            </Link>
          </div>

          <section className="grid grid-cols-175 gap-x-6 gap-y-4 pt-14">
            {props.data.map((item: any) => (
              <div className="flex flex-col h-56" key={item.id}>
                <Image
                  className="!rounded-3xl object-cover"
                  src={item.image.url}
                  width={100}
                  height={200}
                  alt=""
                  unoptimized
                />
                <p className="text-primary mt-3 font-semibold py-1 text-base  sm:text-lg truncate">
                  {item.name}
                </p>
              </div>
            ))}
          </section>
        </section>
      </main>

      <section className="container mt-24 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="">
            <div className="bg-mud rounded-3xl max-w-tiny p-[1.6px]"></div>
            <h2 className="mt-6 text-5xl font-bold max-w-lg leading-tight text-primary">
              Why should you have a dog?
            </h2>
            <p className="text-lg font-normal mt-8 max-w-lg opacity-80">
              Having a dog around you can actually trigger the release of calming
              chemicals in your body which lower your stress and anxiety leves
            </p>
            <a
              href="https://www.purina.co.uk/find-a-pet/articles/getting-a-dog/adoption/benefits-of-having-a-dog#:~:text=Dogs%20provide%20us%20with%20a,personal%20trauma%2C%20such%20as%20bereavement."
              className="inline-block mt-8 text-enamel"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="font-semibold  uppercase">read more</span>
              <span className=" ml-2">&rarr;</span>
            </a>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 h-[28rem] md:h-[35rem]">
            <div className="h-full overflow-hidden  relative rounded-3xl">
              <Image
                src="/playwithme.jpg"
                layout="fill"
                objectFit="cover"
                alt=""
                unoptimized
              />
            </div>

            <div className="h-full overflow-hidden row-span-2 relative rounded-3xl">
              <Image
                src="/puppies.jpg"
                layout="fill"
                objectFit="cover"
                alt=""
                unoptimized
              />
            </div>

            <div className="h-full overflow-hidden  relative rounded-3xl">
              <Image
                src="/cooldog.jpg"
                layout="fill"
                objectFit="cover"
                alt=""
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds?limit=4', {
      headers: { 'x-api-key': process.env.DOG_API_KEY },
    });

    return {
      props: { data: response.data, error: null },
    };
  } catch (error) {
    return {
      props: { data: null, error: 'There was an error. Please try again later' },
    };
  }
}
