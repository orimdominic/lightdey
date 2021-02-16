import React from 'react';
import { Link } from 'react-router-dom';
import { NigeriaMap, Header } from '../components';
import '../assets/styles/home.css';

export const Home = () => {
  return (
    <div className="">
      {/* Nav */}
      <Header />
      {/* Banner */}
      <section className="text-gray-400 bg-black">
        <div className="flex flex-col items-center px-5 py-12 mx-auto md:flex-row">
          <div className="flex flex-col items-center text-center sm:mb-8 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-center md:text-center md:mb-0">
            <h1 className="mb-4 font-medium text-8xl sm:text-6xl lg:text-8xl">
              Light dey?
            </h1>
            <div className="relative mt-4 mb-8">
              <p className="absolute top-0 max-w-xs text-lg font-light leading-normal text-mustard-400 text-top lg:text-2xl">
                Emeka battery don die and him no get light. Him no know which
                street for him area get light.
              </p>
              <p className="max-w-xs text-lg font-light leading-normal text-mustard-400 text-bottom lg:text-2xl">
                Wale wan know weda make him buy fuel as him dey come back house
                based on how how long light don dey.
              </p>
            </div>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <NigeriaMap />
          </div>
        </div>
      </section>
      <div className="py-8 lg:py-10">
        <div className="flex flex-col items-center justify-center px-5">
          <Link to="/states">
            <div className="px-6 py-2 transition-shadow bg-black rounded-sm ld-box-shadow lg:px-10 lg:py-4 hover:shadow-none">
              <span className="font-light text-mustard-400 text-md lg:text-2xl">
                Lets go there!
              </span>
            </div>
          </Link>
          <p className="pt-6 text-2xl text-center lg:pt-8 lg:text-3xl">
            because Warri no dey carry last!
          </p>
        </div>
      </div>
    </div>
  );
};
