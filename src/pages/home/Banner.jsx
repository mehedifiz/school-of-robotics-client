import image_1 from '../../assets/images/home-4.png';
import parth1 from '../../assets/home/home-parth-1.jpg';
import parth2 from '../../assets/home/home-parth-2.png';
import parth3 from '../../assets/home/home-parth-3.png';
import { Button } from '@/components/ui/button';

const Banner = () => {
   return (
      <div className="max-w-7xl bg-primary mx-auto px-4 flex items-center flex-col-reverse gap-y-10 md:flex-row ">
         <div className='basis-1/2 space-y-5'>
            <h1 className="text-4xl md:text-5xl text-white font-semibold flex flex-col space-y-3 text-center md:text-left">
              School of Robotics <span className='text-orange-400'>Bangladesh</span>
            </h1>
            <p className='md:text-lg text-white font-light text-center md:text-left animate-fade-up animate-once animate-duration-[3000ms]'>Explore and learn more about everything from machine learning and global network to scaling your team.</p>
            <div className='flex items-center justify-center md:justify-start animate-fade-up animate-once animate-duration-[3000ms]'>
               <Button  className="bg-white text-black
                hover:bg-white  hover:text-black ">Explore Course </Button>
            </div>
         </div>
         <div className="basis-1/2 justify-center">
            <div className="relative h-full flex items-center justify-center">
               <img src={image_1} alt="" className="w-full rounded-xl animate-fade-right animate-once animate-duration-[1500ms]" />
               
               {/* Animated circular shapes */}
               <div className="absolute top-0 left-0 w-full h-full">
                  {/* Circle 1 - left at 70% height */}
                  <div className="absolute top-[70%] left-0 w-16 h-16 rounded-full z-0 animate-bounce" 
                       style={{ animation: 'bounce 2s infinite', animationDelay: '0.2s' }}>
                     <img src={parth1} alt="" className="w-full h-full rounded-full" />
                  </div>
                  
                  {/* Circle 2 - bottom right */}
                  <div className="absolute top-28 left-60 w-20 h-20 rounded-full z-0 animate-bounce" 
                       style={{ animation: 'bounce 2.3s infinite', animationDelay: '0.7s' }}>
                     <img src={parth2} alt="" className="w-full h-full rounded-full" />
                  </div>
                  
                  {/* Circle 3 - top right */}
                  <div className="absolute top-10 right-0 w-14 h-14 rounded-full z-0 animate-bounce" 
                       style={{ animation: 'bounce 1.8s infinite', animationDelay: '0s' }}>
                     <img src={parth3} alt="" className="w-full h-full rounded-full" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;