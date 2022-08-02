import {useNavigate, useParams} from 'react-router-dom';
import DetailPjCard from '../../components/detailPjCard';
import Title from '../../components/title';
import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import {PjType} from '../../types';

const DetailPj = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<PjType | undefined>();

  useEffect(() => {
    const fetchData = async () =>{
      const res = await axios.get(`/characters/${params.id}`);
      if (res.data && res.data.id) {
        setCharacter(res.data);
      } else {
        navigate('/404');
      }
    };
    fetchData();
  }, [params, setCharacter]);

  const handleEdit = () => {
    navigate(`/editCharacter/${params.id}`);
  };

  return (
    character ?
    <div className="flex w-full py-10">
      <div className="flex-1 flex flex-col gap-4">
        <Title title="LE PERSONNAGE" />
        <DetailPjCard
          pjData={character}
          onEdit={handleEdit}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Title title="SON HISTOIRE" />
        <p className="font-bubblegum mt-6 mb-8">
          {character.story}
        </p>
        <Title title="SES QUÊTES" />
        <p className="font-bubblegum mt-6 mb-8">
           Bientôt disponible
        </p>
      </div>
    </div> : <></>
  );
};

export default DetailPj;
