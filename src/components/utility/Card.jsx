import { Link } from 'react-router-dom';
import course from '../assets/course/js.jpeg'
import FullStar from './FullStar';
const Card = () => {
   return (
      <div className="py-16">
         <div className='border border-gray-300 rounded-xl hover:scale-[1.02] duration-500'>
            <img src={course} alt="course" className='w-full rounded-t-xl' />
            <div className='p-2 space-y-2.5'>
               <h2 className='font-bold text-gray-900/80'>ChatGPT for Mastering compelling content.</h2>
               <p className='font-light text-sm'>We are living the age of science and technology...</p>
               <div className='flex items-center space-x-0.5 text-amber-600'>
                  {Array.from({ length: 5 }).map(() => <FullStar />)}
               </div>
               <div className='flex items-end space-x-3'>
                  <h2 className='font-bold '>$10.33</h2>
                  <del className='font-light text-sm'>$33.00</del>
               </div>

               <Link to='/' className='bg-primary hover:bg-primary/90 py-2.5 px-6 rounded-md text-white font-semibold inline-block text-sm md:text-[16px]'>See Details</Link>

            </div>
         </div>

      </div>
   );
};

export default Card;