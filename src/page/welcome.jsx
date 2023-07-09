import React from 'react';
import { Button } from '@material-tailwind/react';
import heroImage from '../assets/images/star.png';

export default function Welcome() {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImage} alt="Hero" className="absolute top-32 right-0 w-56 md:w-96" />
        <div className="absolute inset-0 bg-blue-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-4">
          Welcome to Massaid's Store
        </h1>
        <p className="text-xl text-white mb-8">
        Your best choice for high-quality products.
        </p>
        <a href='home'>
        <Button className='bg-black hover:bg-gray-500' size="lg">
          Shop Now
        </Button>
        </a>
      </div>
    </section>
  );
}