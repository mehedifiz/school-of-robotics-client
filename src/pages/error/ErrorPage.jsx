import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
   return (
      <div className='w-full h-screen flex items-center justify-center'>
         <Link to='/' className='hover:border-b inline-block mr-5'>Go Home</Link>
         <h2 className='font-semibold text-4xl px-5 border-x border-gray-300'>404</h2>
         <p className='font-light pl-5'>This page could not be found.</p>

      </div>
   );
};

export default ErrorPage;