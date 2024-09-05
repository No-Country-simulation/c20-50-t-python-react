import PropTypes from "prop-types";

const Order = ({ id, title, price, description, category, agregados }) => {
  return (
    <div
      className={`
      h-[92px]
      flex
      flex-row
      items-center
      p-3
    bg-[#BDBDBD]
      rounded-[10px]
      gap-3
    `}
    >
      <img
        src="https://i.pinimg.com/564x/07/21/32/072132759e23ee009f4f9ba04bdc8845.jpg"
        className={`
          w-[68px] 
          h-[68px]
          rounded-lg 
          border
          border-[#878787]
         `}
      />

      <div
        className={`
          flex
          flex-col
          w-full
          gap-2
          `}
      >
        <div
          className={`
           flex
           flex-row
           justify-between
           
          `}
        >
          <span className="font-bold">{title}</span>
          <span>$ {price}</span>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="">Especificaciones</span>
          <div className="flex flex-row">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_333_696)">
                <path
                  d="M7 21.7501V25.5001H10.75L21.81 14.4401L18.06 10.6901L7 21.7501ZM24.71 11.5401C25.1 11.1501 25.1 10.5201 24.71 10.1301L22.37 7.79006C21.98 7.40006 21.35 7.40006 20.96 7.79006L19.13 9.62006L22.88 13.3701L24.71 11.5401Z"
                  fill="#535353"
                />
              </g>
              <defs>
                <clipPath id="clip0_333_696">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(4 4.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_333_702)">
                <path
                  d="M10 23.5C10 24.6 10.9 25.5 12 25.5H20C21.1 25.5 22 24.6 22 23.5V11.5H10V23.5ZM23 8.5H19.5L18.5 7.5H13.5L12.5 8.5H9V10.5H23V8.5Z"
                  fill="#535353"
                />
              </g>
              <defs>
                <clipPath id="clip0_333_702">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(4 4.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

Order.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  agregados: PropTypes.array.isRequired,
};

export default Order;
