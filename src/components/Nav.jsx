const Nav = () => {
   return (
      <nav className="bg-gray-800 p-4 2xl:px-32">
         <div className=" mx-auto flex justify-between items-center">
            <h2 className="text-2xl text-white font-bold">Logo</h2>
            <ul className="flex space-x-4">
               <li className="text-white hover:text-gray-400"><a href="#">Home</a></li>
               <li className="text-white hover:text-gray-400"><a href="#">About</a></li>
               <li className="text-white hover:text-gray-400"><a href="#">Services</a></li>
               <li className="text-white hover:text-gray-400"><a href="#">Contact</a></li>
            </ul>
         </div>

         <div>
            
         </div>
      </nav>
   );
};

export default Nav;