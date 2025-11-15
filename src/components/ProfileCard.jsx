import React from 'react';

// O componente agora recebe o objeto 'profile' e a função 'onCardClick' (que abre o modal)
const ProfileCard = ({ profile, onCardClick }) => {
    
    let imageUrl = profile.foto; 
    
    // Lógica para ajustar o caminho da imagem, se ela estiver em public/
    if (imageUrl.startsWith('./images/')) {
        imageUrl = imageUrl.replace('./images/', '/'); 
    }

    return (
        // O Card inteiro agora é um div com um evento onClick para abrir o Modal
        <div 
            // Ao clicar, chama a função onCardClick (openModal) passando o perfil completo
            onClick={() => onCardClick(profile)} 
            className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden border border-gray-100 cursor-pointer"
        >
            <div className="p-4 flex flex-col items-center">
                
                {/* Imagem do Perfil */}
                <img 
                    src={imageUrl} 
                    alt={profile.nome} 
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
                />
                
                {/* Informações Básicas */}
                <h2 className="text-xl font-semibold text-gray-900 text-center">{profile.nome}</h2>
                <p className="text-sm font-medium text-indigo-600 text-center mb-2">{profile.cargo}</p>
                <p className="text-xs text-gray-500 text-center">{profile.localizacao}</p>
            </div>
            
            {/* Resumo e Habilidades */}
            <div className="p-4 pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profile.resumo}</p>
                
                <h3 className="text-sm font-semibold mb-1">Top Skills:</h3>
                <div className="flex flex-wrap gap-1">
                    {/* Exibe apenas as 3 primeiras habilidades */}
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
        </div>
    );
}

export default ProfileCard;