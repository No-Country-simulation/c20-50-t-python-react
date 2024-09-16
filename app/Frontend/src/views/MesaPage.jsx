import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMesaStore from '../store/useMesaStore'; 
import WelcomeModal from '../components/modals/WelcomeModal'; 

const MesaPage = () => {
  const { numeroMesa } = useParams(); 
  const setNumeroMesa = useMesaStore((state) => state.setNumeroMesa); 
  const navigate = useNavigate(); 
  useEffect(() => {
   
    setNumeroMesa(numeroMesa);
    console.log(numeroMesa);
  }, [numeroMesa, setNumeroMesa]);

  return <WelcomeModal numeroMesa={numeroMesa} navigate={navigate} />;
};

export default MesaPage;
