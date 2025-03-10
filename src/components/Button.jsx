import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ path, content }) => {
   return (
      <div className='my-4'>
         <Link to={path} className='bg-primary hover:bg-primary/90 py-3.5 px-12 text-white font-semibold inline-block text-sm md:text-[16px]'>{content}</Link>
      </div>
   );
};

export default Button;