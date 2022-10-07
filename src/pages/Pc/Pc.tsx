import addIcon from 'assets/icon/add.svg';
import PcCard from 'components/PcCard';
import React, {useState, useEffect} from 'react';
import {PcType} from 'types';
import {useNavigate} from 'react-router-dom';
import {useApi} from 'hooks';
import {toast} from 'react-toastify';

const Pc = () => {
  const [pcData, setPcData] = useState<PcType[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    try {
      const fetchData = async () =>{
        const res = await api.get('/characters');
        setPcData(res.data);
      };
      fetchData();
    } catch (error) {
      toast.error('Impossible de récupérer les personnages');
    }
  }, []);

  return (
    <div className="
      grid
      grid-cols-auto-fill-220
      grid-flow-rows
      w-full
      gap-4
    ">

      { pcData.map((pcData, index) =>
        <PcCard
          key={index}
          pcData={pcData}
          onClick={(id, e) => navigate(`/pc/${id}`)}
        />) }
      <a href="/editCharacter">
        <button className="
          border-dashed
          h-96
          w-56
          border-orange
          border-8
          rounded-2xl
          flex
          justify-center
          items-center
        ">
          <img className="max-h-20" alt="add pc" src={addIcon} />
        </button>
      </a>
    </div>
  );
};

export default Pc;
