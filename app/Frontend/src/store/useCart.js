import { create } from "zustand";

const useCart = create((set) => ({
  // dishes: [], // array de objetos que representan cada platillo
  orders: [], // array de objetos que representan la orden de comida
  total: 0,

  // calculateSubTotalAndTotal: () => {
  //   set((state) => {
  //     let addonsPrice = state.orders.reduce(
  //       (acc, item) => acc + item?.price * item.quantity,
  //       0
  //     );
  //     let foodPrice = state.orders.reduce(
  //       (acc, item) => acc + item.price * item.quantity,
  //       0
  //     );
  //     let subTotal = addonsPrice + foodPrice;
  //     const total = subTotal + subTotal * 0.03; // por defecto, el total es igual al subTotal
  //     return { subTotal, total };
  //   });
  // },

  addDish: (dish) => {
    set((state) => {
      const existingDish = state.orders.find((item) => item.id === dish.id);

      if (state.orders.length === 0) {
        const plate = { ...dish };
        return {
          total: state.total + dish.totalPrice,
          orders: [...state.orders, plate],
        };
      } else {
        if (existingDish) {
          return {
            orders: state.orders.map((item) =>
              item.id === dish.id ? { ...item } : item
            ),
          };
        } else {
          // Aquí debemos agregar la lógica para agregar los agregados del platillo
          const plate = { ...dish };
          return {
            orders: [...state.orders, plate],
          };
        }
      }
    });
    // Call calculateSubTotalAndTotal correctly;
  },

  removeDish: (dishId, quantity) => {
    if (quantity > 0) {
      set((state) => {
        const dishToRemove = state.orders.find((item) => item.id === dishId);

        if (dishToRemove) {
          const itemQuantity = state.orders.map((item) => {
            if (item.id === dishId) {
              return item.quantity;
            }
          });

          if (itemQuantity === quantity) {
            return {
              orders: state.orders.filter((item) => item.id !== dishId),
            };
          } else
            return {
              orders: state.orders.map((item) =>
                item.id === dishId
                  ? { ...item, quantity: item.quantity - quantity }
                  : item
              ),
            };
        }
      });
    } else return "Hubo un error en su pedido, por favor intente de nuevo";
  },
}));

export default useCart;
