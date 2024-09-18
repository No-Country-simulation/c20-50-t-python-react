import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig';

const MozoCallsTable = () => {
  const [calls, setCalls] = useState([]);
  const CALLS_URL = "/mozocall";

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axiosConfig.get(CALLS_URL);
        setCalls(response.data); 
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    };

    fetchCalls();
    const intervalId = setInterval(fetchCalls, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMarkAsDelivered = async (id) => {
    try {
      const response = await axiosConfig.put(`${CALLS_URL}/${id}/entregar`);
      const updatedCall = response.data.mozoCall; // Obtenemos la llamada actualizada desde el backend
      setCalls(calls.map(call =>
        call.id === id ? { ...call, atendido: updatedCall.atendido, hentrega: updatedCall.hentrega } : call
      ));
    } catch (error) {
      console.error('Error marking as delivered:', error);
    }
  };

  const handleMarkAsCharged = async (id) => {
    try {
      const response = await axiosConfig.put(`${CALLS_URL}/${id}/cobrar`);
      const updatedCall = response.data.mozoCall; // Obtenemos la llamada actualizada desde el backend
      setCalls(calls.map(call =>
        call.id === id ? { ...call, cobrado: updatedCall.cobrado, atendido: updatedCall.atendido, hentrega: updatedCall.hentrega } : call
      ));
    } catch (error) {
      console.error('Error marking as charged:', error);
    }
  };

  const handleDeleteCall = async (id) => {
    try {
      await axiosConfig.delete(`${CALLS_URL}/${id}`);
      setCalls(calls.filter(call => call.id !== id));
    } catch (error) {
      console.error('Error deleting call:', error);
    }
  };

  // Ordenamos las llamadas según el estado (cobrados al final)
  const sortedCalls = [...calls].sort((a, b) => {
    if (a.cobrado && !b.cobrado) return 1;
    if (!a.cobrado && b.cobrado) return -1;
    if (a.atendido && !b.atendido) return 1;
    if (!a.atendido && b.atendido) return -1;
    return new Date(a.solicitado) - new Date(b.solicitado);
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Llamadas a Mozos</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Mesa</th>
            <th className="border border-gray-200 p-2">Solicitado</th>
            <th className="border border-gray-200 p-2">Atendido</th>
            <th className="border border-gray-200 p-2">Hora de Atención</th>
            <th className="border border-gray-200 p-2">Cuenta</th>
            <th className="border border-gray-200 p-2">Cobrado</th>
            <th className="border border-gray-200 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedCalls.map((call) => (
            <tr
              key={call.id}
              className={
                call.cobrado
                  ? 'bg-green-200'
                  : call.cuenta
                  ? 'bg-yellow-200'
                  : call.atendido
                  ? 'bg-red-200'
                  : ''
              }
            >
              <td className="border border-gray-200 p-2 text-center">{call.id}</td>
              <td className="border border-gray-200 p-2 text-center">{call.mesa}</td>
              <td className="border border-gray-200 p-2 text-center">
                {new Date(call.solicitado).toLocaleString()}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {call.atendido ? 'Sí' : 'No'}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {call.hentrega ? new Date(call.hentrega).toLocaleString() : 'N/A'}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {call.cuenta ? 'Sí' : 'No'}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {call.cobrado ? 'Sí' : 'No'}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {!call.atendido && (
                  <button
                    onClick={() => handleMarkAsDelivered(call.id)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Atendido
                  </button>
                )}
                {call.atendido && !call.cobrado && (
                  <button
                    onClick={() => handleMarkAsCharged(call.id)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Cobrado
                  </button>
                )}
                {call.cobrado && (
                  <button
                    onClick={() => handleDeleteCall(call.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MozoCallsTable;
