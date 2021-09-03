import React from 'react';
import Link from 'next/link';

import Paw from '../../public/paw.svg';

interface Props extends React.PropsWithChildren<unknown> {}

export function Layout({ children }: Props) {
  return (
    <section className="min-h-screen flex flex-col">
      <header className="container py-6">
        <Link href="/" passHref>
          <a className="font-cursive flex mr-auto items-center">
            <span className="mr-1 text-2xl">DogWiki</span>
            <img className="w-10" src="/logo.png" alt="Logo" />
          </a>
        </Link>
      </header>

      <section>{children}</section>

      <footer className="container mt-auto rounded-t-large bg-hero-color">
        <div className="md:px-20 py-8 text-white flex justify-between">
          <div className="flex items-center">
            <p className="text-xl font-cursive">DogWiki</p>
            <Paw className="ml-2 w-5" />
          </div>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </section>
  );
}
