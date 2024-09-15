import React, { useEffect, useState } from 'react';
import axiosConfig from '../utils/axiosConfig';
import CreateProductModal from '../components/modals/CreateProductModal'; // Importar modal para crear productos
import ModProductModal from '../components/modals/ModProductModal'; // Importar modal para modificar productos

const URL_GET_MENU = '/menu';
const URL_PRODUCT_DELETE = '/menu';

const ManagePanel = () => {
  const [productos, setProductos] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para abrir/cerrar modal de creación
  const [isModProductModalOpen, setIsModProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para hacer el refetch de los productos
  const fetchProductos = async () => {
    try {
      const response = await axiosConfig.get(URL_GET_MENU);
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  // 1. Llamada inicial para obtener los productos desde la API
  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id, productoNombre) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productoNombre}" y sus agregados?`);
  
    if (confirmed) {
      try {
        await axiosConfig.delete(`${URL_PRODUCT_DELETE}/${id}`);
        setProductos(productos.filter((producto) => producto.id !== id));
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  // 2. Abrir modal para agregar producto
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  // 3. Cerrar modal y hacer refetch si se agrega un producto
  const closeCreateModal = (newProduct) => {
    setIsCreateModalOpen(false);
    if (newProduct) {
      fetchProductos(); // Refetch de productos después de agregar uno nuevo
    }
  };
  
  // 4. Abrir modal para modificar producto
  const openModProductModal = (product) => {
    setIsModProductModalOpen(true);
    setSelectedProduct(product);
  };
  
  const closeModProductModal = (updatedProduct) => {
    setIsModProductModalOpen(false);
    if (updatedProduct) {
      fetchProductos(); // Refetch de productos después de modificar uno
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <button
        onClick={openCreateModal}
        className="p-2 bg-blue-500 text-white rounded mb-4"
      >
        Crear Producto
      </button>

      {/* Tabla de productos */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border border-gray-200">Imagen</th>
            <th className="border border-gray-200 p-2">Producto</th>
            <th className="border border-gray-200 p-2">Precio</th>
            <th className="border border-gray-200 p-2">Descripción</th>
            <th className="border border-gray-200 p-2">Categoría</th>
            <th className="border border-gray-200 p-2">Agregados</th>
            <th className="border border-gray-200 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="border border-gray-200 p-2">
                {producto.imagenes && producto.imagenes[0] ? (
                  <img
                    src={producto.imagenes[0].url}
                    alt={producto.producto}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <span>No hay imagen</span>
                )}
              </td>
              <td className="border border-gray-200 p-2">{producto.producto}</td>
              <td className="border border-gray-200 p-2">${producto.precio}</td>
              <td className="border border-gray-200 p-2">{producto.descripcion}</td>
              <td className="border border-gray-200 p-2">{producto.categoria}</td>
              <td className="border border-gray-200 p-2">
                {producto.agregados.length > 0
                  ? producto.agregados.map((agregado) => (
                      <span key={agregado.id}>{agregado.nombre}</span>
                    )).reduce((prev, curr) => [prev, ', ', curr])
                  : 'Sin agregados'}
              </td>
              <td className="border border-gray-200 p-2 flex flex-col justify-center">
                {/* Botones para editar/eliminar */}
                <button
                  onClick={() => handleDelete(producto.id, producto.producto)}
                  className="p-2 bg-red-500 text-white rounded mb-2"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => openModProductModal(producto)}
                  className="p-2 bg-yellow-500 text-white rounded mb-1"
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de creación de productos */}
      {isCreateModalOpen && (
        <CreateProductModal
          onClose={closeCreateModal} // Pasa la función de cierre
        />
      )}

      {/* Modal de modificación de productos */}
      {isModProductModalOpen && selectedProduct && (
        <ModProductModal
          product={selectedProduct}
          onClose={closeModProductModal}          
        />
      )}

    </div>
  );
};

export default ManagePanel;
