import Input from '../../../components/input';
import InputSelect from '../../../components/inputSelect';
import Title from '../../../components/title';
import React, {useContext, useEffect, useState} from 'react';
import AlignmentInput from './AlignmentInput';
import TextInput from '../../../components/textInput';
import {
  culteMoocked,
  jobsMoocked,
  lawsMoocked,
  moralsMoocked,
  racesMoocked,
} from '../../../moockedData';
import FileInput from '../../../components/fileInput';
import {PrimaryButton} from '../../../components';
import api from '../../../api/axios';
import {useNavigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../../AppRoute';

// eslint-disable-next-line max-len
const textExternCreate = 'Si vous n\'avez pas de personnage vous pouvez en créer un grâce à l\'outil disponible ';

const AddPj = () => {
  const [culte, setCulte] = useState<number | undefined>();
  const [job, setJob] = useState<number | undefined>();
  const [race, setRace] = useState(0);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(0);
  const [moral, setMoral] = useState(0);
  const [law, setLaw] = useState(0);
  const [story, setStory] = useState('');

  const {setUser} = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api(setUser).get(`/characters/${params.id}`);
      if (res.data.id) {
        if (res.data.culte) setCulte(culteMoocked.indexOf(res.data.culte));
        if (res.data.job) setJob(jobsMoocked.indexOf(res.data.job));
        setRace(racesMoocked.indexOf(res.data.race));
        setName(res.data.name);
        setLevel(res.data.level);
        setGold(res.data.gold);
        setMoral(moralsMoocked.indexOf(res.data.alignment.moral));
        setLaw(lawsMoocked.indexOf(res.data.alignment.law));
        setStory(res.data.story);
      }
    };
    if (params.id) {
      fetchData();
    }
  }, [params]);

  const saveCharacter = () => {
    if (
      name &&
      racesMoocked[race] &&
      level > 0 &&
      level < 30 &&
      gold >= 0 &&
      moral >= 0 &&
      moral < 3 &&
      law >= 0 &&
      law < 3
    ) {
      const body = {
        player: 1,
        name,
        culte: culte ? culteMoocked[culte] : undefined,
        job: job ? jobsMoocked[job] : undefined,
        race: racesMoocked[race],
        level,
        gold,
        alignment: {
          moral: moralsMoocked[moral],
          law: lawsMoocked[law],
        },
        story,
      };
      console.log('params.id', !!params.id, params.id);
      if (params.id) {
        api(setUser).put(
            '/characters',
            [{...body, id: params.id}],
        );
      } else {
        api(setUser).post(
            '/characters',
            body,
        );
      }
      navigate('/');
    }
  };

  return (
    <div className="
      p-8
      flex
      flex-col
      bg-orange/[.8]
      w-full
      rounded-3xl
      justify-around
      items-center
    ">
      <Title title="CREATIION D'UN PERSONNAGE"/>
      <div className='pt-8 w-full flex justify-between mb-6'>
        <div className='
          flex
          flex-col
          gap-3
          justify-between
          items-center
          flex-1
        '>
          <Input
            placeholder="Nom du personnage"
            type="text"
            value={name}
            setValueString={setName}
          />
          <InputSelect
            title={'Metier'}
            height='16'
            options={jobsMoocked}
            handleChange={(newValue) => setJob(newValue)}
            value={job}
            emptyValue='Aucun'
          />
          <InputSelect
            title={'Race'}
            height='16'
            options={racesMoocked}
            handleChange={(newValue) => setRace(newValue)}
            value={race}
          />
          <Input
            placeholder="Niveau du personnage"
            type="number"
            value={level}
            setValueNumber={(newValue) => setLevel(parseInt(newValue))}
          />
          <Input
            placeholder="Nombre de PO"
            type="number"
            value={gold}
            setValueNumber={(newValue) => setGold(parseInt(newValue))}
          />
          <FileInput text="PHOTO" />
        </div>
        <div className='
          flex
          flex-col
          gap-4
          justify-around
          flex-1
          h-full
        '>
          <AlignmentInput
            moral={moral}
            law={law}
            setMoral={setMoral}
            setLaw={setLaw}
          />
          <InputSelect
            title={'Culte'}
            height='16'
            options={culteMoocked}
            handleChange={(newValue) => setCulte(newValue)}
            value={culte}
            emptyValue='Aucun'
          />
          <TextInput
            value={story}
            setValue={setStory}
            placeholder="Histoire du personnage"
          />
        </div>
      </div>
      {
        !params.id &&
        <p className='mb-4 text-lg text-bubblegum text-swamp font-semibold'>
          {textExternCreate}
          <a
            className='
              font-bold
              hover:underline
            '
            href="http://naheulbeuk-db.byethost9.com/charactersheet/charactersheet"
          >
            ici
          </a>
        </p>
      }
      <PrimaryButton
        text="Envoyer"
        onClick={() => saveCharacter()}
      />
    </div>
  );
};

export default AddPj;
