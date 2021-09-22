import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Breed } from './types';

export type BreedContextType = {
  breed: Breed | null;
  manageBreed: (breed: Breed | null) => void;
};

const BreedContext = createContext<BreedContextType | null>(null);

export function useBreedContext() {
  const context = useContext(BreedContext);

  if (context === undefined) {
    throw new Error('BreedContext was used outside of its Provider');
  }

  return context;
}

export function BreedProvider(props: PropsWithChildren<unknown>) {
  const [breed, setBreed] = useState<Breed | null>(null);

  const handleBreed = (breed: Breed | null) => {
    setBreed(breed);
  };

  return (
    <BreedContext.Provider value={{ breed, manageBreed: handleBreed }}>
      {props.children}
    </BreedContext.Provider>
  );
}
