// src/views/AgendaPedidos.jsx
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig';

const AgendaPedidos = () => {
  // Define estados: 'pedidos' contiene los pedidos obtenidos de la API,
  // 'sortedPedidos' se usa para mostrar los pedidos ordenados en la tabla,
  // 'sortBy' y 'sortDirection' controlan la columna y dirección de ordenamiento.
  const [pedidos, setPedidos] = useState([]);
  const [sortedPedidos, setSortedPedidos] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const PEDIDOS_URL = "/pedidos"; // URL para obtener los pedidos.

  // useEffect para obtener los datos de los pedidos desde la API.
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Llamada a la API utilizando axiosConfig.
        const response = await axiosConfig.get(PEDIDOS_URL);
        setPedidos(response.data); // Guarda los datos recibidos en el estado 'pedidos'.
        setSortedPedidos(response.data); // Inicializa los pedidos ordenados con los datos recibidos.
      } catch (error) {
        console.error('Error fetching pedidos:', error); // Muestra un error si algo falla.
      }
    };

    // Llama a la función fetchPedidos para obtener los pedidos.
    fetchPedidos();

    // Actualiza los pedidos cada 5 segundos (polling).
    const intervalId = setInterval(fetchPedidos, 5000);

    // Limpia el intervalo cuando el componente se desmonta.
    return () => clearInterval(intervalId);
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  // useEffect que se ejecuta cada vez que cambian 'sortBy' o 'sortDirection'.
  useEffect(() => {
    // Si no hay un criterio de ordenamiento seleccionado, no hacer nada.
    if (!sortBy) return;

    // Ordena los pedidos según la columna seleccionada ('sortBy') y la dirección ('sortDirection').
    const sorted = [...pedidos].sort((a, b) => {
      if (sortBy === 'mesa') {
        // Ordena por el número de mesa.
        return sortDirection === 'asc' ? a.id_mesa - b.id_mesa : b.id_mesa - a.id_mesa;
      }
      if (sortBy === 'solicitado') {
        // Ordena por la fecha en la que se solicitó.
        return sortDirection === 'asc'
          ? new Date(a.solicitado) - new Date(b.solicitado)
          : new Date(b.solicitado) - new Date(a.solicitado);
      }
      if (sortBy === 'entregado') {
        // Ordena por si el pedido fue entregado o no.
        return sortDirection === 'asc'
          ? (a.entregado ? 1 : 0) - (b.entregado ? 1 : 0)
          : (b.entregado ? 1 : 0) - (a.entregado ? 1 : 0);
      }
      return 0; // Devuelve 0 si no hay criterio de ordenamiento.
    });

    // Actualiza el estado de 'sortedPedidos' con los pedidos ordenados.
    setSortedPedidos(sorted);
  }, [sortBy, sortDirection, pedidos]); // Se ejecuta cuando cambian 'sortBy', 'sortDirection' o 'pedidos'.

  // Función para manejar el clic en las columnas y activar el ordenamiento.
  const handleSort = (key) => {
    setSortBy((prevSortBy) => {
      // Cambia la dirección de ordenamiento si se vuelve a hacer clic en la misma columna.
      const newDirection = (prevSortBy === key && sortDirection === 'asc') ? 'desc' : 'asc';
      setSortDirection(newDirection); // Actualiza la dirección.
      return key; // Actualiza la columna por la que se ordena.
    });
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
          </tr>
        </thead>
        <tbody>
          {/* Mapea los pedidos ordenados para mostrarlos en la tabla */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgendaPedidos;
