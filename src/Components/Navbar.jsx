import React from 'react';
import { Link } from 'react-router-dom';
import ModalSign from './ModalSign';


const Navbar = () => {
    return (
        <div className='Navbar p-2'>
           <div className="flex justify-evenly sm:text-sm sm:lg:p-10 xl:p-5 lg:text-xl">
                <Link to={"/"} className='font-bold'>Blog Mantap</Link>
                <ul>
                    <li>
                        <Link to={"/"}>All</Link>
                    </li>
                    <li>
                        <Link to={"/c/science"}>Science</Link>
                    </li>
                    <li>
                        <Link to={"/c/art"}>Art</Link>
                    </li>
                    <li>
                        <a href="#">Technology</a>
                    </li>
                    <li>
                        <a href="#">Movies</a>
                    </li>
                    <li>
                        <a href="#">Food</a>
                    </li>
                </ul>

                 <ModalSign/>
           </div>
        </div>
    );
};

export default Navbar;
