import { Link } from 'react-router-dom';
import NigeriaMap from '../components/NigeriaMap';
import '../assets/styles/home.css';
import Header from '../components/Header';

export default function Home(props) {
  return (
    <div className="">
      {/* Nav */}
      <Header />
      {/* Banner */}
      <section className="text-gray-400 bg-black">
        <div className="flex flex-col items-center px-5 py-12 mx-auto md:flex-row">
          <div className="flex flex-col items-center mb-8 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-center md:text-center md:mb-0">
            <h1 className="mb-4 font-medium text-white text-8xl sm:text-6xl lg:text-8xl">
              Light dey?
            </h1>
            <h2 className="max-w-xs mb-8 leading-relaxed text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <NigeriaMap />
          </div>
        </div>
      </section>
      {/* CTA */}
      <div className="">
        <div className="px-5 py-12 mx-auto">
          <div className="flex flex-col w-full text-center">
            <p className="mb-2 text-3xl font-medium text-black sm:text-4xl">
              Warri no dey carry last.
            </p>
            <p className="mx-auto text-2xl leading-tight text-gray-800 lg:w-2/3">
              Go choose the state wey the street dey!
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-center mx-auto">
          <Link to="/states" className="">
            <button className="px-10 py-4 bg-black rounded-sm focus:outline-none">
              <span className="text-white">Oya now!</span>
            </button>
          </Link>
          <Link to="/" className="absolute pinging -z-5">
            <button className="px-10 py-4 bg-black rounded-sm focus:outline-none">
              <span className="text-white">Oya now!</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
