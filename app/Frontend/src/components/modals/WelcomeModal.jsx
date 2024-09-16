import React from 'react';

const WelcomeModal = ({ numeroMesa, navigate }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-300 bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Bienvenido a Nostra Cocina</h2>
        <p className="mb-6">Usted está pidiendo para la mesa {numeroMesa}</p>

        <div className="space-x-4">
          {/* Botón para llamar al mozo (enlazar funcionalidad luego) */}
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Llamar al mozo
          </button>

          {/* Botón para continuar al menú (redirige a /) */}
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continuar al menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
