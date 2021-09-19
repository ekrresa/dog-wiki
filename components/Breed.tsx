import Image from 'next/image';
import { getName } from 'country-list';
import { Breed } from '../lib/types';

export function BreedView(props: Breed) {
  return (
    <div className="sm:flex mb-8 last:mb-0 overflow-auto">
      <div className="float-left sm:float-none h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 flex-shrink-0 rounded-3xl overflow-hidden relative mr-6 md:mr-10 mb-4 sm:mb-0">
        {props.image ? (
          <Image src={props?.image.url} layout="fill" objectFit="cover" alt="" />
        ) : (
          <Image src="/no-image.png" layout="fill" objectFit="cover" alt="" />
        )}
      </div>

      <div>
        <h3 className="font-semibold text-xl md:text-2xl mb-2">{props.name}</h3>

        <p className="mb-1">
          <span>The {props.name} is a </span>
          <span className="lowercase">{props.temperament} dog.</span>
          <span> It was originally developed for </span>
          <span className="lowercase">{props.bred_for}.</span>
          <span> Weight ranges from </span>
          <span>{props.weight.metric.split('-').join('to')} kilogrammes.</span>
          <span> They live on average for </span>
          <span>{props.life_span.split('-').join('to')}.</span>
          {props.country_code && (
            <span> Originally bred in {getName(props.country_code)}.</span>
          )}
        </p>
      </div>
    </div>
  );
}
