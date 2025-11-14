import React from 'react';
import { Link } from 'react-router-dom';


const ProfileCard = ({ profile }) => {
    
    let imageUrl = profile.foto; 
    
    if (imageUrl.startsWith('./images/')) {
        imageUrl = imageUrl.replace('./images/', '/'); 
    }

    return (
        <Link 
            to={`/profile/${profile.id}`} 
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
        >
            <div className="p-4 flex flex-col items-center">
                <img 
                    src={imageUrl} 
                    alt={profile.nome} 
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
                />
                
                <h2 className="text-xl font-semibold text-gray-900 text-center">{profile.nome}</h2>
                <p className="text-sm font-medium text-indigo-600 text-center mb-2">{profile.cargo}</p>
                <p className="text-xs text-gray-500 text-center">{profile.localizacao}</p>
            </div>
            
            <div className="p-4 pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profile.resumo}</p>
                
                <h3 className="text-sm font-semibold mb-1">Top Skills:</h3>
                <div className="flex flex-wrap gap-1">
                    {profile.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
                        <span 
                            key={index} 
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default ProfileCard;