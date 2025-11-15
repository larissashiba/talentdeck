import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <header className="bg-indigo-600 shadow-lg p-4 sticky top-0 z-10"> 
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            ProFinder
        </Link>
        

        <Link to="/" className="text-white hover:text-indigo-200 transition duration-150">
            Meu Perfil
        </Link>
    </div>
    </header>
    );
}

export default Navbar;