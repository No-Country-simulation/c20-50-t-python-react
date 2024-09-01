import Orders from "../components/orders/Orders";

const OrderSummary = () => {
  return (
    <div className="flex flex-col w-[32%] bg-[#E6E6E6] mr-1 rounded-[15px] py-2 px-1">
      <div className="w-full px-3 pb-2 mb-2 border-b border-[#00000080]">
        <span className="text-lg font-bold">Mi pedido</span>
      </div>
      <Orders />
      <div name="bills" className="flex flex-col pl-3 pr-2 font-medium ">
        <div className="flex flex-row">Sub-total</div>
        <div className="flex flex-row">Total</div>
      </div>

      <div></div>
    </div>
  );
};

export default OrderSummary;
