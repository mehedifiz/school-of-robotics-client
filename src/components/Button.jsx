import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
   return (
      <div className='my-4'>
         <Link to='/course' className='bg-primary hover:bg-primary/90 py-3.5 px-12 text-white font-semibold inline-block text-sm md:text-[16px]'>Explore Courses</Link>
      </div>
   );
};

export default Button;