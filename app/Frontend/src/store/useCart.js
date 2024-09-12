import { create } from "zustand";

const useCart = create((set) => ({
  // dishes: [], // array de objetos que representan cada platillo
  orders: [], // array de objetos que representan la orden de comida
  subTotal: 0,
  total: 0,

  addDish: (dish, quantity) => {
    set((state) => {
      const existingDish = state.order.find((item) => item.id === dish.id);

      if (existingDish) {
        return {
          order: state.order.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // Aquí debemos agregar la lógica para agregar los agregados del platillo
        const dishWithAddons = { ...dish, quantity, addons: [] };
        dish.agregados.forEach((addon) => {
          dishWithAddons.addons.push({ ...addon, quantity: 0 });
        });
        return {
          order: [...state.order, dishWithAddons],
        };
      }
    });
  },

  removeDish: (dishId, quantity) => {
    if (quantity > 0) {
      set((state) => {
        const dishToRemove = state.order.find((item) => item.id === dishId);
        if (dishToRemove) {
          const itemQuantity = state.order.map((item) => {
            if (item.id === dishId) {
              return item.quantity;
            }
          });

          if (itemQuantity === quantity) {
            return {
              order: state.order.filter((item) => item.id !== dishId),
            };
          } else
            return {
              order: state.order.map((item) =>
                item.id === dishId
                  ? { ...item, quantity: item.quantity - quantity }
                  : item
              ),
            };
        }
      });
    } else return "Hubo un error en su pedido, por favor intente de nuevo";
  },

  calculateSubTotal: () => {
    set((state) => ({
      subTotal: state.order.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    }));
  },

  calculateTotal: () => {
    // aquí puedes agregar lógica para calcular el total con descuentos o ofertas
    set((state) => ({
      total: state.subTotal, // por defecto, el total es igual al subTotal
    }));
  },
}));

export default useCart;
