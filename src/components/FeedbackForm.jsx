import React, { useState } from 'react';

const FeedbackForm = ({ action, profileName, onClose }) => {
    // Renomeando para refletir o foco no CNPJ/Empresa
    const [cnpjEmpresa, setCnpjEmpresa] = useState(''); 
    const [message, setMessage] = useState('');

    // Função para aplicar a máscara de CNPJ enquanto o usuário digita
    const maskCNPJ = (value) => {
        // Remove tudo que não for dígito
        value = value.replace(/\D/g, ''); 
        // Aplica a máscara: XX.XXX.XXX/XXXX-XX
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        // Limita a 18 caracteres (incluindo pontuação)
        return value.substring(0, 18);
    };

    // Função que lida com a mudança no campo de CNPJ
    const handleCnpjChange = (e) => {
        const maskedValue = maskCNPJ(e.target.value);
        setCnpjEmpresa(maskedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // VALIDAÇÃO: Verifica se o campo possui 18 caracteres (o formato completo)
        if (cnpjEmpresa.length !== 18) {
            alert('Por favor, insira um CNPJ válido com 14 dígitos (XX.XXX.XXX/XXXX-XX).');
            return;
        }

        console.log(`${action} Enviado:`, { profileName, sender: cnpjEmpresa, message });
        alert(`${action} para ${profileName} enviado com sucesso! (Verifique o console)`);
        onClose(); // Fecha o formulário após o envio
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {action === 'Recomendar' ? `Avaliar e Recomendar ${profileName}` : `Enviar Mensagem para ${profileName}`}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
                {action === 'Recomendar' 
                    ? 'Use o formulário abaixo para enviar uma avaliação detalhada deste profissional.'
                    : 'Escreva sua mensagem. Seu contato será repassado ao profissional.'
                }
            </p>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">CNPJ da Empresa/Organização:</label>
                    <input
                        type="text"
                        value={cnpjEmpresa}
                        onChange={handleCnpjChange} // Usa a nova função com máscara
                        placeholder="XX.XXX.XXX/XXXX-XX"
                        className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        maxLength="18"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        {action === 'Recomendar' ? 'Avaliação Detalhada:' : 'Sua Mensagem:'}
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={action === 'Recomendar' ? 6 : 4}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className={`font-bold py-2 px-4 rounded transition duration-200 ${action === 'Recomendar' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    >
                        {action === 'Recomendar' ? 'Enviar Recomendação' : 'Enviar Mensagem'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;