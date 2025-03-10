import image_1 from '../../assets/home/photo_06.jpeg';
import image_2 from '../../assets/home/photo_07.jpeg';
import image_3 from '../../assets/home/photo_08.jpeg';
import Button from '../../components/Button';

const Banner = () => {
   return (
      <div className="max-w-7xl mx-auto px-4 flex items-center flex-col-reverse gap-y-10 md:flex-row ">

         <div className='basis-1/2 space-y-5'>
            <h1 className="text-4xl md:text-5xl font-semibold flex flex-col space-y-3 text-center md:text-left">
               <span className='animate-fade-up animate-once animate-duration-[1500ms]'>Level Up Your Skills</span>
               <span className='animate-fade-up animate-once animate-duration-[1500ms]'>with Hands On</span>
               <span className="text-primary animate-fade-up animate-once animate-duration-[2300ms]">Tech Courses</span>
            </h1>
            <p className='md:text-lg font-light text-center md:text-left animate-fade-up animate-once animate-duration-[3000ms]'>Master cutting-edge tech skills through hands-on, project-based courses designed to boost your expertise and career growth.</p>
            <div className='flex items-center justify-center md:justify-start animate-fade-up animate-once animate-duration-[3000ms]'>
               <Button path='/course' content='Explore Courses' />
            </div>
         </div>


         <div className="grid grid-cols-2 gap-4 mt-8 basis-1/2 justify-center">


            <div className="relative h-full flex items-center justify-center ">
               <img src={image_1} alt="" className="w-full rounded-xl animate-fade-right animate-once animate-duration-[1500ms]" />
            </div>


            <div className="grid grid-rows-2 gap-4">
               <img src={image_2} alt="" className="w-full h-full object-cover rounded-xl animate-fade-down animate-once animate-duration-[1500ms]" />
               <img src={image_3} alt="" className="w-full h-full object-cover rounded-xl animate-fade-up animate-once animate-duration-[1500ms]" />
            </div>
         </div>
      </div>
   );
};

export default Banner;
