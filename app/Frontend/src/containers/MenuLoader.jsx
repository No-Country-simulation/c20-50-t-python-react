import { useEffect } from "react";
import "../styles/loader.css";
import CardsContainer from "./CardsContainer";
import useMenu from "../store/useMenu";

const MenuLoader = () => {
  const { fetchMenu, isLoading } = useMenu();

  useEffect(() => {
    fetchMenu();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <div className="loader">
          <div className="panWrapper">
            <div className="pan">
              <div className="food"></div>
              <div className="panBase"></div>
              <div className="panHandle"></div>
            </div>
            <div className="panShadow"></div>
          </div>
        </div>
      </div>
    );
  }

  return <CardsContainer />;
};

export default MenuLoader;
