// src/views/AgendaPedidos.jsx
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig';

const AgendaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [sortedPedidos, setSortedPedidos] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const PEDIDOS_URL = "/pedidos";

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axiosConfig.get(PEDIDOS_URL);
        setPedidos(response.data);
        setSortedPedidos(response.data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
    const intervalId = setInterval(fetchPedidos, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!sortBy) return;

    const sorted = [...pedidos].sort((a, b) => {
      if (sortBy === 'mesa') {
        return sortDirection === 'asc' ? a.id_mesa - b.id_mesa : b.id_mesa - a.id_mesa;
      }
      if (sortBy === 'solicitado') {
        return sortDirection === 'asc'
          ? new Date(a.solicitado) - new Date(b.solicitado)
          : new Date(b.solicitado) - new Date(a.solicitado);
      }
      if (sortBy === 'entregado') {
        return sortDirection === 'asc'
          ? (a.entregado ? 1 : 0) - (b.entregado ? 1 : 0)
          : (b.entregado ? 1 : 0) - (a.entregado ? 1 : 0);
      }
      return 0;
    });

    setSortedPedidos(sorted);
  }, [sortBy, sortDirection, pedidos]);

  const handleSort = (key) => {
    setSortBy((prevSortBy) => {
      const newDirection = (prevSortBy === key && sortDirection === 'asc') ? 'desc' : 'asc';
      setSortDirection(newDirection);
      return key;
    });
  };

  const handleEntregarPedido = async (id) => {
    try {
      await axiosConfig.put(`/pedidos/${id}/entregar`);
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === id ? { ...pedido, entregado: true } : pedido
        )
      );
    } catch (error) {
      console.error('Error updating pedido:', error);
    }
  };

  const handleEliminarPedido = async (id) => {
    try {
      await axiosConfig.delete(`/pedidos/${id}/forzar-eliminar`);
      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.id !== id)
      );
    } catch (error) {
      console.error('Error deleting pedido:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda de Pedidos</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th
              className="border border-gray-200 p-2 cursor-pointer"
              onClick={() => handleSort('mesa')}
            >
              Mesa {sortBy === 'mesa' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="border border-gray-200 p-2">Producto</th>
            <th className="border border-gray-200 p-2">Agregados</th>
            <th className="border border-gray-200 p-2">Cantidad</th>
            <th
              className="border border-gray-200 p-2 cursor-pointer"
              onClick={() => handleSort('solicitado')}
            >
              Solicitado {sortBy === 'solicitado' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border border-gray-200 p-2 cursor-pointer"
              onClick={() => handleSort('entregado')}
            >
              Entregado {sortBy === 'entregado' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="border border-gray-200 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedPedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td className="border border-gray-200 p-2">{pedido.id}</td>
              <td className="border border-gray-200 p-2 text-center">{pedido.id_mesa}</td>
              <td className="border border-gray-200 p-2">{pedido.producto.producto}</td>
              <td className="border border-gray-200 p-2">
                {pedido.agregados.length > 0 ? (
                  <ul>
                    {pedido.agregados.map((agregado) => (
                      <li key={agregado.id}>{agregado.nombre}</li>
                    ))}
                  </ul>
                ) : (
                  'Sin agregados'
                )}
              </td>
              <td className="border border-gray-200 p-2 text-center">{pedido.cantidad}</td>
              <td className="border border-gray-200 p-2 text-center">
                {new Date(pedido.solicitado).toLocaleTimeString()}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {pedido.entregado ? 'Sí' : 'No'}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {!pedido.entregado ? (
                  <button
                    onClick={() => handleEntregarPedido(pedido.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Marcar como entregado
                  </button>
                ) : (
                  <button
                    onClick={() => handleEliminarPedido(pedido.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
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

export default AgendaPedidos;
