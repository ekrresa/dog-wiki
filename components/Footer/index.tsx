import Paw from '../../public/paw.svg';

export function Footer() {
  return (
    <footer className="container rounded-t-large bg-hero-color mt-32">
      <div className="md:px-20 py-8 text-white flex justify-between">
        <div className="flex items-center">
          <p className="text-xl font-cursive">DogWiki</p>
          <Paw className="ml-2 w-5" />
        </div>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
