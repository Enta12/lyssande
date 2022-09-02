import addIcon from '../../assets/add.svg';
import PjCard from '../../components/pjCard';
import React, {useState, useEffect, useContext} from 'react';
import api from '../../api/axios';
import {PjType} from '../../types';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../AppRoute';

const Pj = () => {
  const [pjData, setPjData] = useState<PjType[]>([]);
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () =>{
      const res = await api(setUser).get('/characters');
      setPjData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="
      grid
      grid-cols-auto-fit-220
      grid-flow-rows
      w-full
      gap-4
    ">

      { pjData.map((pjData, index) =>
        <PjCard
          key={index}
          pjData={pjData}
          onClick={(id, e) => navigate(`/pj/${id}`)}
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
          <img className="max-h-20" alt="add pj" src={addIcon} />
        </button>
      </a>
    </div>
  );
};

export default Pj;
