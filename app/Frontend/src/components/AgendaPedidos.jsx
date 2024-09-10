import React, { useState, useEffect } from 'react';

const AgendaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('https://restomanager.onrender.com/pedidos')
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Error fetching pedidos:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda de Pedidos</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Producto</th>
            <th className="border border-gray-200 p-2">Cantidad</th>
            <th className="border border-gray-200 p-2">Mesa</th>
            <th className="border border-gray-200 p-2">Entregado</th>
            <th className="border border-gray-200 p-2">Solicitado</th>
            <th className="border border-gray-200 p-2">Agregados</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td className="border border-gray-200 p-2">{pedido.id}</td>
              <td className="border border-gray-200 p-2">{pedido.producto.producto}</td>
              <td className="border border-gray-200 p-2">{pedido.cantidad}</td>
              <td className="border border-gray-200 p-2">{pedido.id_mesa}</td>
              <td className="border border-gray-200 p-2">{pedido.entregado ? "Sí" : "No"}</td>
              <td className="border border-gray-200 p-2">{new Date(pedido.solicitado).toLocaleString()}</td>
              <td className="border border-gray-200 p-2">
                {pedido.agregados.length > 0 ? (
                  <ul>
                    {pedido.agregados.map((agregado) => (
                      <li key={agregado.id}>{agregado.nombre} - ${agregado.precio}</li>
                    ))}
                  </ul>
                ) : (
                  "Sin agregados"
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
