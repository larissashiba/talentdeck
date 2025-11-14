import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
    <header className="bg-indigo-600 shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            TalentDeck
        </Link>
        
        <div className="flex items-center space-x-4">
            <input
            type="text"
            placeholder="Buscar por nome ou cargo..."
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64 text-gray-800"
            />
            <Link to="/" className="text-white hover:text-indigo-200 transition duration-150">
            Meu Perfil
            </Link>
        </div>
        </div>
    </header>
    );
}

export default Navbar;