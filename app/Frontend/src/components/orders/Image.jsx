const Image = () => {
  return (
    <div className="relative flex-1 ">
      <div
        id="image"
        className="h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.pinimg.com/564x/07/21/32/072132759e23ee009f4f9ba04bdc8845.jpg)`,
        }}
      ></div>
    </div>
  );
};

export default Image;
