import {useNavigate, useParams} from 'react-router-dom';
import {DetailPcCard} from 'components';
import Title from 'components/Title';
import React, {useState, useEffect} from 'react';
import {PcType} from 'types';
import {useApi} from 'hooks';
import {toast} from 'react-toastify';

const DetailPc = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<PcType | undefined>();
  const api = useApi();

  useEffect(() => {
    try {
      const fetchData = async () =>{
        const res = await api.get(`/characters/${params.id}`);
        if (res.data && res.data.id) {
          setCharacter(res.data);
        } else {
          navigate('/404');
        }
      };
      fetchData();
    } catch (error) {
      toast.error('Impossible de récupérer les informations du personnage');
    }
  }, [params, setCharacter]);

  const handleEdit = () => {
    navigate(`/editCharacter/${params.id}`);
  };

  return (
    character ?
    <div className="flex w-full py-10">
      <div className="flex-1 flex flex-col gap-4">
        <Title title="LE PERSONNAGE" />
        <DetailPcCard
          pcData={character}
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

export default DetailPc;
