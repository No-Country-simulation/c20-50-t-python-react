import React, { useState, useEffect } from 'react';
import axiosConfig from '../../utils/axiosConfig';

const URL_UPDATE_MENU = '/menu'; // Cambia esta URL según la API que estés usando
const URL_ADD_AGREGADO = '/agregados'; // URL para agregar nuevos agregados

const ModProductModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    producto: '',
    precio: '',
    descripcion: '',
    categoria: '',
    agregados: [], // No inicializamos con un agregado vacío
    imagenes: [{ url: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        producto: product.producto,
        precio: product.precio,
        descripcion: product.descripcion,
        categoria: product.categoria,
        agregados: product.agregados.map(agregado => ({
          ...agregado,
          isNew: false // Marcamos como existente
        })) || [],
        imagenes: product.imagenes || [{ url: '' }]
      });
    }
  }, [product]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAgregadoChange = (index, field, value) => {
    const newAgregados = [...formData.agregados];
    newAgregados[index] = { ...newAgregados[index], [field]: value };
    setFormData({ ...formData, agregados: newAgregados });
  };

  const addAgregado = () => {
    setFormData({
      ...formData,
      agregados: [...formData.agregados, { nombre: '', precio: '', descripcion: '', isNew: true }]
    });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, imagenes: [{ url: value }] });
  };

  const handleSave = async () => {
    try {
      if (!product || !product.id) {
        throw new Error('Product ID is missing');
      }

      // Actualiza el producto en la API
      await axiosConfig.put(`${URL_UPDATE_MENU}/${product.id}`, {
        producto: formData.producto,
        precio: formData.precio,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        agregados: formData.agregados.filter(agregado => !agregado.isNew), // Solo modificamos los existentes
        imagenes: formData.imagenes
      });

      // Agregar nuevos agregados
      await Promise.all(formData.agregados
        .filter(agregado => agregado.isNew)
        .map(agregado =>
          axiosConfig.post(URL_ADD_AGREGADO, {
            id_menu: product.id, // Aseguramos que el id_menu esté presente
            nombre: agregado.nombre,
            precio: agregado.precio,
            descripcion: agregado.descripcion
          })
        )
      );
      
      console.log('Producto actualizado:', formData);
      onClose(formData); // Cierra el modal y pasa el producto actualizado
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-[70vw] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl mb-4">Editar Producto</h2>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Nombre, Categoría y Precio */}
          <input
            type="text"
            name="producto"
            placeholder="Nombre del producto"
            value={formData.producto}
            onChange={handleFieldChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={formData.categoria}
            onChange={handleFieldChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleFieldChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          
          {/* Descripción (ocupa las 3 columnas) */}
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleFieldChange}
            className="mb-2 p-2 border border-gray-300 rounded col-span-3"
          />

          {/* Agregados */}
          <h3 className="text-xl mb-2 col-span-3">Agregados</h3>
          {formData.agregados.map((agregado, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                placeholder="Nombre del agregado"
                value={agregado.nombre}
                onChange={(e) => handleAgregadoChange(index, 'nombre', e.target.value)}
                className="mb-1 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Precio"
                value={agregado.precio}
                onChange={(e) => handleAgregadoChange(index, 'precio', e.target.value)}
                className="mb-1 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={agregado.descripcion}
                onChange={(e) => handleAgregadoChange(index, 'descripcion', e.target.value)}
                className="mb-1 p-2 border border-gray-300 rounded col-span-3"
              />
            </React.Fragment>
          ))}
          <button
            type="button"
            onClick={addAgregado}
            className="p-2 bg-green-500 text-white rounded col-span-3"
          >
            Agregar otro agregado
          </button>

          {/* Imagen */}
          <h3 className="text-xl mb-2 col-span-3">Imagen</h3>
          <input
            type="text"
            placeholder="URL de la imagen"
            value={formData.imagenes[0].url}
            onChange={handleImageChange}
            className="mb-2 p-2 border border-gray-300 rounded col-span-3"
          />
        </form>

        {/* Botones de acción */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={() => onClose(null)}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModProductModal;
