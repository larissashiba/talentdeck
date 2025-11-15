import React, { useState, useEffect } from 'react';
import profilesData from '../assets/profiles.json'; 
import ProfileCard from '../components/ProfileCard';
import ProfileDetailModal from '../components/ProfileDetailModal';

// Componente de ícone de Filtro usando SVG
const FilterIcon = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={`w-6 h-6 transition duration-300 ${props.isOpen ? 'rotate-180 text-indigo-700' : 'text-gray-500'}`}
    >
        <path fillRule="evenodd" d="M3.792 2.983A.75.75 0 014.5 2.25h15c.23 0 .445.116.574.313a.75.75 0 01.07 1.057l-6.25 7.41V18.75c0 .248-.126.471-.33.606l-2.625 1.751A.75.75 0 0110.125 21v-8.79l-6.25-7.41a.75.75 0 01-.07-1.057z" clipRule="evenodd" />
    </svg>
);

const ProfileList = () => { 
    const [searchTerm, setSearchTerm] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    
    const [filterArea, setFilterArea] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterSkill, setFilterSkill] = useState('');
    
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setProfiles(profilesData);
    }, []);

    const openModal = (profile) => {
        setSelectedProfile(profile);
    };

    const closeModal = () => {
        setSelectedProfile(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); 
    };
    const handleFilterAreaChange = (event) => {
        setFilterArea(event.target.value);
    };
    const handleFilterCityChange = (event) => {
        setFilterCity(event.target.value);
    };
    const handleFilterSkillChange = (event) => {
        setFilterSkill(event.target.value);
    };
    
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const filteredProfiles = profiles.filter(profile => {
        const lowerSearch = searchTerm.toLowerCase();
        const lowerArea = filterArea.toLowerCase();
        const lowerCity = filterCity.toLowerCase();
        const lowerSkill = filterSkill.toLowerCase();
        
        const matchesSearch = (
            profile.nome.toLowerCase().includes(lowerSearch) ||
            profile.cargo.toLowerCase().includes(lowerSearch)
        );

        const matchesArea = filterArea === '' || profile.cargo.toLowerCase().includes(lowerArea);
        
        const matchesCity = filterCity === '' || profile.localizacao.toLowerCase().includes(lowerCity);

        const matchesSkill = filterSkill === '' || 
                             profile.habilidadesTecnicas?.some(skill => 
                                 skill.toLowerCase().includes(lowerSkill)
                             );

        return matchesSearch && matchesArea && matchesCity && matchesSkill;
    });

    if (profiles.length === 0) {
        return <h1 className="text-center text-xl mt-10">Carregando perfis...</h1>;
    }
    
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                Explore Talentos em Destaque
            </h1>
            
            <div className="mb-4 max-w-3xl mx-auto flex gap-3">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Buscar profissionais por nome ou cargo..."
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className="w-full p-3 rounded-lg border-2 border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-gray-800 text-lg shadow-sm transition duration-150"
                    />
                </div>
                
                {/* Botão de Filtro com Tooltip (balãozinho) */}
                <div className="relative group"> {/* Adicionado 'group' aqui */}
                    <button
                        onClick={toggleFilters}
                        className="flex-shrink-0 p-3 bg-white rounded-lg border-2 border-indigo-300 shadow-sm hover:shadow-md transition duration-150"
                        aria-expanded={showFilters}
                        aria-controls="advanced-filters"
                    >
                        <FilterIcon isOpen={showFilters} />
                    </button>
                    {/* Tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        Filtros Avançados
                    </span>
                </div>
            </div>

            {showFilters && (
                <div 
                    id="advanced-filters"
                    className="mb-10 max-w-4xl mx-auto p-6 bg-indigo-50 rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                >
                    <h2 className="text-lg font-semibold text-indigo-700 mb-4">Filtros Avançados</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        
                        {/* FILTRO POR ÁREA/CARGO */}
                        <div className="w-full sm:w-[calc(33%-10px)] min-w-[150px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Área/Cargo</label>
                            <input
                                type="text"
                                placeholder="Ex: Marketing"
                                value={filterArea}
                                onChange={handleFilterAreaChange}
                                className="w-full p-2 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            />
                        </div>
                        
                        {/* FILTRO POR CIDADE */}
                        <div className="w-full sm:w-[calc(33%-10px)] min-w-[150px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input
                                type="text"
                                placeholder="Ex: Rio de Janeiro"
                                value={filterCity}
                                onChange={handleFilterCityChange}
                                className="w-full p-2 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            />
                        </div>

                        {/* FILTRO POR TECNOLOGIA/SKILL */}
                        <div className="w-full sm:w-[calc(33%-10px)] min-w-[150px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologia/Skill</label>
                            <input
                                type="text"
                                placeholder="Ex: Python"
                                value={filterSkill}
                                onChange={handleFilterSkillChange}
                                className="w-full p-2 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            )}

            {filteredProfiles.length === 0 && (searchTerm || filterArea || filterCity || filterSkill) && (
                <h1 className="text-center text-xl mt-10 text-gray-600">
                    Nenhum resultado encontrado com os filtros atuais.
                </h1>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {filteredProfiles.map(profile => (
                    <ProfileCard 
                        key={profile.id} 
                        profile={profile}
                        onCardClick={openModal} 
                    />
                ))}
            </div>

            {selectedProfile && (
                <ProfileDetailModal 
                    profile={selectedProfile} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
}

export default ProfileList;