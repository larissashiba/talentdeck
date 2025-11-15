import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';


const ProfileDetailModal = ({ profile, onClose }) => {
    // NOVO ESTADO: Controla qual formulário secundário está aberto ('Recomendar', 'Mensagem', ou null)
    const [currentAction, setCurrentAction] = useState(null); 

    if (!profile) return null; 

    let imageUrl = profile.foto; 
    if (imageUrl.startsWith('./images/')) {
        imageUrl = imageUrl.replace('./images/', '/'); 
    }

    const handleActionClick = (action) => {
        setCurrentAction(action);
    };

    const handleFormClose = () => {
        setCurrentAction(null);
    };

    // Renderiza o Modal de Formulário se currentAction estiver ativo
    if (currentAction) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm" onClick={handleFormClose}>
                <div 
                    className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300" 
                    onClick={(e) => e.stopPropagation()} 
                >
                    <FeedbackForm 
                        action={currentAction} 
                        profileName={profile.nome} 
                        onClose={handleFormClose} 
                    />
                </div>
            </div>
        );
    }
    
    // Renderiza o Modal de Detalhe se nenhum formulário estiver aberto
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300" 
                onClick={(e) => e.stopPropagation()} 
            >
                {/* ... (Cabeçalho e Botão Fechar) ... */}
                <div className="p-4 border-b flex justify-end sticky top-0 bg-white z-10">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-3xl font-light leading-none">
                        &times; 
                    </button>
                </div>

                <div className="p-8">
                    {/* 1. INFORMAÇÕES PESSOAIS E ACADÊMICAS (Contato e Telefone REMOVIDOS) */}
                    <div className="flex items-start border-b pb-6 mb-6">
                        <img 
                            src={imageUrl} 
                            alt={profile.nome} 
                            className="w-32 h-32 rounded-full object-cover mr-6 border-4 border-indigo-500 flex-shrink-0"
                        />
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">{profile.nome}</h1>
                            <p className="text-xl font-medium text-indigo-600 mb-2">{profile.cargo} - {profile.localizacao}</p>
                            
                            {/* LINHAS DE CONTATO E TELEFONE REMOVIDAS */}

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">Formação Acadêmica:</h3>
                            <div className="mt-2">
                                {/* CORREÇÃO APLICADA AQUI: Mapeando o array de formação */}
                                {profile.formacao && profile.formacao.length > 0 ? (
                                    profile.formacao.map((item, index) => (
                                        <div key={index} className="mb-1">
                                            <p className="text-gray-700 font-medium">
                                                {item.curso}
                                                {/* Exibe o ano entre parênteses, se existir */}
                                                {item.ano && <span className="text-sm text-gray-500 ml-1">({item.ano})</span>} 
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-700">Não informado.</p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Resumo */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Resumo</h2>
                    <p className="text-gray-700 mb-6">{profile.resumo}</p>

                    {/* 2. EXPERIÊNCIAS E HABILIDADES TÉCNICAS */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Experiência Profissional</h2>
                    {profile.experienciaProfissional?.map((exp, index) => ( 
                        <div key={index} className="mb-4 p-3 border-l-4 border-indigo-400 bg-gray-50 rounded">
                            <h3 className="text-lg font-bold text-gray-900">{exp.cargo} em {exp.empresa}</h3>
                            <p className="text-sm text-gray-500">{exp.dataInicio} - {exp.dataFim}</p>
                            <p className="text-gray-600 mt-1">{exp.descricao}</p>
                        </div>
                    ))}

                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 mt-6">Habilidades Técnicas</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {profile.habilidadesTecnicas?.map((skill, index) => ( 
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>


                    {/* 3. SOFT SKILLS (Hobbies REMOVIDO) */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 mt-6">Soft Skills</h2> 
                    <div className="flex flex-wrap gap-1 mb-6">
                        {profile.softSkills?.map((skill, index) => ( 
                            <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                {skill}
                            </span>
                        ))}
                        {(!profile.softSkills || profile.softSkills.length === 0) && <p className="text-gray-500">Não listado.</p>}
                    </div>

                    {/* 4. BOTÕES DE AÇÃO (Agora abrem o formulário) */}
                    <div className="flex space-x-4 mt-8 pt-4 border-t">
                        <button 
                            onClick={() => handleActionClick("Recomendar")} // CHAMA AÇÃO
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md flex items-center"
                        >
                            Recomendar profissional
                        </button>
                        <button 
                            onClick={() => handleActionClick("Mensagem")} // CHAMA AÇÃO
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md flex items-center"
                        >
                            Enviar mensagem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetailModal;